import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterLink } from '@angular/router';
import { DynModuleSubcomponentComponent } from './dyn-module-subcomponent.component';
import {AuthGuard} from '@pl-core/_services';

const routes: Routes = [{
  path: '',
  component: DynModuleSubcomponentComponent,
  canActivate: [AuthGuard],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynModuleSubcomponentRoutingModule { }
