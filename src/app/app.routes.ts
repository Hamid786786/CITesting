import {Routes, RouterModule} from '@angular/router';
import {NoContentComponent} from '@pl-modules/no-content';
import {DashboardComponent} from '@pl-modules/dashboard/dashboard.component';

import {AuthGuard} from '@pl-core/_services';
import {DataResolver} from '@pl/app.resolver';
import {HomeComponent} from '@pl-modules/home/home.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'df-demo',
  //   component: DynamicFormDemoComponent
  // },
  // { path: 'about', component: AboutComponent },
  // {
  //   path: 'detail', loadChildren: () => System.import('./+detail')
  //     .then((comp: any) => comp.default),
  // },
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: '**', redirectTo: '' , pathMatch: 'full'},
];
