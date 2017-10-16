import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import {MdDialogRef, MdSnackBar} from '@angular/material';
import {DialogComponent} from '@pl-modules/dialog/dialog.component';
import { User } from '@pl-core/_models';
import {AuthService} from '../../../core/_services/auth/auth.service';
import { TranslateService } from '@pl-core/_services/translate/translate.service';
import { GLOBAL} from '@pl-core/_config/constants';

@Component({
  selector: 'app-email-signature',
  templateUrl: './email-signature.component.html',
  styleUrls: ['./email-signature.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class EmailSignatureComponent {
  public currentUser: User;
  public form: FormGroup;
  @ViewChild('editor') public editor: QuillEditorComponent;
  constructor(private _authService: AuthService,
              public translateService: TranslateService,
              fb: FormBuilder,
              public dialogRef: MdDialogRef<DialogComponent>,
              private snackBar: MdSnackBar) {
      this.currentUser = this._authService.currentUser();
      this.form = fb.group({
      editor: [this.currentUser['emailSignature']]
    });
  }

  public setFocus($event) {
    $event.focus();
  }

  public submit() {
    this.currentUser['emailSignature'] = this.form.controls.editor.value;
    this._authService.updateUserProfile(this.currentUser.id, this.currentUser).subscribe(
      (_resp) => {
        this.snackBar.open(this.translateService.instant('Email Signature updated successfully'), this.translateService.instant('close'), {
          duration: GLOBAL.constants.DURATION,
          extraClasses: ['success']
        });
      });
    this.dialogRef.close();
  }
}
