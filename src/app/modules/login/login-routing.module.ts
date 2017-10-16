import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ChangePasswordComponent} from './change-password/change-password.component';

import {AuthGuard, AuthService} from '@pl-core/_services';

const loginRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: [
      {
        path: '',
        redirectTo: 'default',
        pathMatch: 'full'
      },
      {
        path: 'default',
        component: LoginFormComponent
      },
      {
        path: 'default/:tenantId',
        component: LoginFormComponent
      },
      {
        path: 'forgot',
        component: ForgotPasswordComponent
      },
      {
        path: 'forgot/:tenantId',
        component: ForgotPasswordComponent
      },
      {
        path: 'change',
        component: ChangePasswordComponent
      },
      {
        path: 'change/:tenantId',
        component: ChangePasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard]
})

export class LoginRoutingModule {
}
