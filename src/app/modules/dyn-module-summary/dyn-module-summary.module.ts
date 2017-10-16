import { NgModule } from '@angular/core';
import {CoreModule} from '@pl-core/core.module';
import { CommonModule } from '@angular/common';
import { DynModuleSummaryRoutingModule } from './dyn-module-summary-routing.module';
import { DynModuleSummaryComponent } from './dyn-module-summary.component';
import { DynModuleSummaryListComponent } from './dyn-module-summary-list/dyn-module-summary-list.component';
 import { TranslateService } from '@pl-core/_services/translate/translate.service';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    DynModuleSummaryRoutingModule
  ],
  declarations: [DynModuleSummaryComponent, DynModuleSummaryListComponent],
  providers: [TranslateService]
})
export class DynModuleSummaryModule { }
