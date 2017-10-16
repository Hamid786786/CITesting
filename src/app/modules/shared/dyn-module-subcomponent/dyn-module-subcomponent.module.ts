import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from '@pl-core/core.module';
// import {SharedModule} from '../shared/shared.module';

import { DynModuleSubcomponentRoutingModule } from './dyn-module-subcomponent-routing.module';
import { DynModuleSubcomponentComponent } from './dyn-module-subcomponent.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    DynModuleSubcomponentRoutingModule
  //  SharedModule
  ],
  declarations: [DynModuleSubcomponentComponent]
})
export class DynModuleSubcomponentModule { }
