import {NgModule, ApplicationRef, Injectable} from '@angular/core';
// import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, PreloadAllModules} from '@angular/router';
import {removeNgStyles, createNewHosts, createInputTransfer} from '@angularclass/hmr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// Imports for loading & configuring the in-memory web api
// import { InMemoryDataOverrideService }  from '@pl/testing/in-memory-data-override.service';
// import { DataTableModule } from 'angular2-datatable';
/*
 * Platform and Environment providers/directives/pipes
 */
import {ENV_PROVIDERS} from '@pl/environment';
import {APP_ROUTES} from '@pl/app.routes';
// App is our top level component
import {AppComponent} from '@pl/app.component';
import {APP_RESOLVER_PROVIDERS} from '@pl/app.resolver';
import {AppState, InternalStateType} from '@pl/app.service';
import {CoreModule} from '@pl-core/core.module';
import {CoreServiceModule} from '@pl-core/core-services.module';
import {LoginModule} from '@pl-modules/login/login.module';
import {DashboardModule} from '@pl-modules/dashboard/dashboard.module';
import {CommunicationModule} from '@pl-modules/communication/communication.module';
import {DynmoduleModule} from '@pl-modules/dyn-module/dyn-module.module';
import {DynModuleSummaryModule} from '@pl-modules/dyn-module-summary/dyn-module-summary.module';
import {DialogComponent} from '@pl-modules/dialog/dialog.component';
import {DashboardDialogueComponent} from '@pl-modules/dashboard/dashboard-dialogue/dashboard-dialogue.component';
// import {DynModuleDailogueComponent} from '@pl-modules/dyn-module/dyn-module-dailogue/dyn-module-dailogue.component';
import '../styles/styles.scss';
import {HomeModule} from '@pl-modules/home/home.module';
import {NoContentModule} from './modules/no-content/no-content.module';
import {IframeModule} from './modules/iframe/iframe.module';
import {CarouselModule} from './modules/carousel/carousel.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from '@pl-core/_services/httpClient.interceptor';
import {APP_BASE_HREF} from '@angular/common';
import {TRANSLATION_PROVIDERS} from '@pl-core/_services/translate/translations';

// import { NotFoundComponent } from './modules/not-found/not-found.component';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    // DynModuleDailogueComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    CoreServiceModule,
    // ENV === 'development' || ENV === 'testing' ? InMemoryWebApiModule.forRoot(InMemoryDataOverrideService, { delay: 500 }) : [],
    LoginModule,
    HomeModule,
    DashboardModule,
    CommunicationModule,
    DynmoduleModule,
    RouterModule.forRoot(APP_ROUTES, {preloadingStrategy: PreloadAllModules}),
    NoContentModule,
    IframeModule,
    CarouselModule
  ],
  entryComponents: [DialogComponent, DashboardDialogueComponent],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    TRANSLATION_PROVIDERS,
    {provide: APP_BASE_HREF, useValue: '/'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(public appRef: ApplicationRef,
              public appState: AppState) {
  }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
