// Modules
import {NgModule} from '@angular/core';
import {CoreModule} from '@pl-core/core.module';
import {NavModule} from '@pl-modules/nav/nav.module';
import {LoginRoutingModule} from './login-routing.module';
import {CarouselModule} from '@pl-modules/carousel/carousel.module';

// Components
import {LoginComponent} from './login.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ForgotPasswordService} from '@pl-core/_services';
@NgModule({
  imports: [
    CoreModule, NavModule, LoginRoutingModule, CarouselModule
  ],
  declarations: [LoginComponent, LoginFormComponent, ForgotPasswordComponent, ChangePasswordComponent],
  exports: [],
  providers: [ForgotPasswordService]
})

export class LoginModule {
}
