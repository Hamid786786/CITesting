import { NgModule, Injectable } from '@angular/core';
import {CoreModule} from '@pl-core/core.module';
import {NavModule} from '../nav/nav.module';
import { DynModuleComponent } from './dyn-module.component';
import {DynModuleListComponent} from './dyn-module-list/dyn-module-list.component';
import {DynmoduleRoutingModule} from './dyn-module-routing.module';
import {DynModuleDailogueGraphComponent} from './dyn-module-graph/dyn-module-graph-dailogue/dyn-module-graph-dailogue.component';
import {SharedModule} from '../shared/shared.module';
import { DynModuleMapComponent } from './dyn-module-map/dyn-module-map.component';
import { DynModuleGraphComponent } from './dyn-module-graph/dyn-module-graph.component';
import {MdNativeDateModule, MdTableModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk';
import {AgmCoreModule, LAZY_MAPS_API_CONFIG , LazyMapsAPILoaderConfigLiteral} from '@agm/core';
import {IframeModule} from '../iframe/iframe.module';
import {GridModule} from '@pl-modules/grid/grid.module';
import {MdDatepickerModule} from '@angular/material';
import { AccordionComponent } from './accordion/accordion.component';
import { AccordionGroupComponent } from './accordion/accordion-group/accordion-group.component';
import {AuthService} from '@pl-core/_services';
import {DynModuleDailogueComponent} from './dyn-module-dailogue/dyn-module-dailogue.component';
import {CarouselModule} from '@pl-modules/carousel/carousel.module';

@Injectable()
export class GoogleMapsConfig implements LazyMapsAPILoaderConfigLiteral {
  public apiKey: string ;
  constructor(private _authService: AuthService) {
    this.apiKey = _authService.currentUser() && _authService.currentUser().agmKey ? _authService.currentUser().agmKey : '';
    _authService.getMapKey$.subscribe((key) => {
      this.apiKey = key;
    });
  }
}

@NgModule({
  imports: [
    CoreModule,
    NavModule,
    DynmoduleRoutingModule,
    SharedModule,
    MdTableModule,
    CdkTableModule,
    IframeModule,
    MdDatepickerModule,
    MdNativeDateModule,
    CarouselModule,
    AgmCoreModule.forRoot()
  ],
  declarations: [DynModuleComponent, DynModuleListComponent, DynModuleMapComponent, DynModuleGraphComponent, DynModuleDailogueGraphComponent, AccordionComponent, AccordionGroupComponent, DynModuleDailogueComponent],
  exports: [ ],
  providers: [ {provide: LAZY_MAPS_API_CONFIG, useClass: GoogleMapsConfig}],
  entryComponents: [DynModuleDailogueGraphComponent, DynModuleDailogueComponent]
})
export class DynmoduleModule {

}
