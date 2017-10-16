import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@pl-core/_services';
import {DynModuleComponent} from '@pl-modules/dyn-module/dyn-module.component';
import {DynModuleListComponent} from '@pl-modules/dyn-module/dyn-module-list/dyn-module-list.component';
import { NotFoundModule } from '@pl-modules/not-found/not-found.module';
import { NotFoundComponent } from '@pl-modules/not-found/not-found.component';
import {DynModuleMapComponent} from './dyn-module-map/dyn-module-map.component';
import {DynModuleGraphComponent} from './dyn-module-graph/dyn-module-graph.component';

const routes: Routes = [{
  path: '',
  component: DynModuleComponent,
  canActivate: [AuthGuard],
  children: [
   {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
   },
   {
    path: 'list/:moduleId',
    component: DynModuleListComponent
   }, {
    path: 'map/:moduleId',
    component: DynModuleMapComponent
   }, {
    path: 'graph/:moduleId',
    component: DynModuleGraphComponent
   },
    {
      path: '**',
      component: NotFoundComponent,
      canActivate: [AuthGuard],
    }
  ]
}];

@NgModule({
  declarations: [],
  imports: [
    NotFoundModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class DynmoduleRoutingModule {
}
