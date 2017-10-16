import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '@pl-core/_services';
import { DynModuleSummaryComponent } from './dyn-module-summary.component';
import { DynModuleSummaryListComponent } from './dyn-module-summary-list/dyn-module-summary-list.component';

const routes: Routes = [{
  path: '',
  component: DynModuleSummaryComponent,
  canActivate: [AuthGuard],
  children: [{
    path: ':moduleNo',
    component: DynModuleSummaryListComponent

  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynModuleSummaryRoutingModule { }
