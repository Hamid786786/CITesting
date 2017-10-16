/**
 * The core module consolidates components and services that are only
 * required in the root AppComponent into one cohesive block. This
 * means the core module only needs to be imported once across the whole
 * application.
 *
 * Singleton, application-wide services which we only need one unique
 * instance of are also registered here in the providers array.
 */

import {NgModule, Optional, SkipSelf} from '@angular/core';
import {throwIfAlreadyLoaded} from './core-import-guard';

import {
  AuthGuard, AuthService, CreateWidgetService, LoadingService, LoginService, ForgotPasswordService,
  AlertService, NavService, PaletteConfiguratorService, PaletteFetcherService,
  TranslateService, TRANSLATION_PROVIDERS, ExceptionService, GlobalCreateService,
  SorterService, DashboardService, GlobalService, MetaService, FormService, CreateService, DynModuleService, DynModulesmapService, DynModulesGraphService, NodeDisplayService
} from '@pl-core/_services';

const SERVICES = [
  AuthGuard, AuthService, CreateWidgetService, LoadingService, LoginService, ForgotPasswordService,
  AlertService, NavService, PaletteConfiguratorService, PaletteFetcherService,
  TranslateService, TRANSLATION_PROVIDERS, ExceptionService, GlobalCreateService,
  SorterService, DashboardService, GlobalService, MetaService, FormService, CreateService, DynModuleService, DynModulesmapService, DynModulesGraphService, NodeDisplayService
];

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [...SERVICES],
  entryComponents: []
})

export class CoreServiceModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreServiceModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreServiceModule');
  }
}
