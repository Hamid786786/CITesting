import {NgModule} from '@angular/core';
import {CoreModule} from '@pl-core/core.module';
import {RouterModule} from '@angular/router';
import {LeftNavComponent} from './left/nav-left.component';
import {TopNavComponent} from './top/nav-top.component';
import {SettingNavComponent} from './setting/nav-setting.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { DigitalSignatureComponent } from './digital-signature/digital-signature.component';
import {SignatureFieldComponent} from './signature-field/signature-field.component';
import {ProfileNavNewComponent} from './profile-nav/profile-nav.component';
import { EmailSignatureComponent } from './email-signature/email-signature.component';
import { QuillModule } from 'ngx-quill';
import { NotificationComponent } from './notification/notification.component';
import {SharedModule} from '../shared/shared.module';
import {NotificationService} from '@pl-core/_services';

@NgModule({
  imports: [
    CoreModule, RouterModule, SignaturePadModule, QuillModule, SharedModule
  ],
  declarations: [
    TopNavComponent, ProfileNavNewComponent, SettingNavComponent,
    LeftNavComponent, DigitalSignatureComponent, SignatureFieldComponent, EmailSignatureComponent,
    NotificationComponent
  ],
  exports: [
    LeftNavComponent, ProfileNavNewComponent, TopNavComponent, SettingNavComponent, DigitalSignatureComponent, EmailSignatureComponent
  ],
  entryComponents: [
    DigitalSignatureComponent, EmailSignatureComponent
  ],
  providers: [NotificationService]
})
export class NavModule {
}
