import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@pl-core/_services';
import {DashboardGridModule} from '../dashboard-grid/dashboard-grid.module';

import {DashboardComponent} from './dashboard.component';
import {DashboardGridComponent} from '../dashboard-grid/dashboard-grid.component';
import { NotFoundModule } from '@pl-modules/not-found/not-found.module';
import { NotFoundComponent } from '@pl-modules/not-found/not-found.component';
const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: DashboardGridComponent,
      data: {
        breadcrumb: 'Dashboard'
      }
    },  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [AuthGuard],
    }
  ]
}];

@NgModule({
  declarations: [],
  imports: [
    DashboardGridModule,
    NotFoundModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class DashboardRoutingModule {
}
