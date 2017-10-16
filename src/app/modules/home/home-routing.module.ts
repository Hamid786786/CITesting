import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';
import {AuthGuard} from '@pl-core/_services';
import {SummaryModule} from '@pl-modules/summary/summary.module';
import {SummaryComponent} from '@pl-modules/summary/summary.component';
import {ChangeComponent} from '@pl-modules/change/change.component';
import {TimesheetComponent} from '@pl-modules/timesheet/timesheet.component';
import {TimesheetModule} from '../timesheet/timesheet.module';
import {ChangeModule} from '@pl-modules/change/change.module';
import {CreateModule} from '@pl-modules/create/create.module';
import {CreateComponent} from '@pl-modules/create/create.component';

export const routes: Routes = [{
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      }, {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: 'app/modules/dashboard/dashboard.module#DashboardModule'
      }, {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }, {
         path: 'communication',
         loadChildren: 'app/modules/communication/communication.module#CommunicationModule'
      }, {
        path: 'create/:moduleId',
        component: CreateComponent,
      }, {
        path: 'module',
        loadChildren: 'app/modules/dyn-module/dyn-module.module#DynmoduleModule'
      }, {
        path: 'dyn-module-summary/:moduleId/:moduleNo',
        loadChildren: 'app/modules/dyn-module-summary/dyn-module-summary.module#DynModuleSummaryModule'
      } ,
      {
        path: 'module-subcomponent/:moduleId/:moduleNo',
        loadChildren: 'app/modules/shared/dyn-module-subcomponent/dyn-module-subcomponent.module#DynModuleSubcomponentModule'
      } , {
         path: 'timesheet',
         component: TimesheetComponent
      },
      {
      path: 'change/:moduleId/:moduleNo',
      component: ChangeComponent,
     },
    {
      path: 'summary/:moduleId/:moduleNo',
      component: SummaryComponent,
    },
      {
        path: '**',
        redirectTo: '/dashboard' ,
        pathMatch: 'full'
      }
    ]
  },
  {path: '**', redirectTo: '/dashboard' , pathMatch: 'full' },
  ];

@NgModule({
  imports: [TimesheetModule,
            ChangeModule,
            SummaryModule,
            CreateModule,
            RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
