import {Component, ViewChildren, QueryList, ElementRef, ViewEncapsulation, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators }  from '@angular/forms';
import {SignatureFieldComponent} from '../signature-field/signature-field.component';
import {MdDialogRef, MdSnackBar} from '@angular/material';
import {DialogComponent} from '@pl-modules/dialog/dialog.component';
import {AuthService} from '../../../core/_services/auth/auth.service';
import { User } from '@pl-core/_models';
import {TranslateService} from '@pl-core/_services/translate/translate.service';
import { GLOBAL} from '@pl-core/_config/constants';

@Component({
  selector: 'app-digital-signature',
  templateUrl: './digital-signature.component.html',
  styleUrls: ['./digital-signature.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class DigitalSignatureComponent implements AfterViewInit {
  public currentUser: User;
  public digitalSign: string = '';
  public flag: boolean = true;

  @ViewChildren(SignatureFieldComponent) public sigs: QueryList<SignatureFieldComponent>;
  @ViewChildren('sigContainer2') public sigContainer2: QueryList<ElementRef>;
  public form: FormGroup;
  constructor(fb: FormBuilder,
              public dialogRef: MdDialogRef<DialogComponent>,
              private _authService: AuthService,
              public translateService: TranslateService,
              private snackBar: MdSnackBar) {
    this.currentUser = this._authService.currentUser();
    if (this.currentUser.digitalSignature && this.currentUser.digitalSignature !== '') {
      this.digitalSign = this.currentUser.digitalSignature;
      this.flag = false;
    }
    this.form = fb.group({
      signatureField2: ['', Validators.required]
    });
  }

  public ngAfterViewInit() {
    this.beResponsive();
    this.setOptions();
  }

  // set the dimensions of the signature pad canvas
  public beResponsive() {
    this.size(this.sigContainer2['first'], this.sigs['last']);
  }

  public size(container: ElementRef, sig: SignatureFieldComponent) {
    sig.signaturePad.set('canvasWidth', container.nativeElement.clientWidth);
    sig.signaturePad.set('canvasHeight', container.nativeElement.clientHeight);
  }

  public setOptions() {
    this.sigs.last.signaturePad.set('penColor', 'rgb(0, 0, 0)');
    this.sigs.last.signaturePad.set('backgroundColor', 'rgb(255, 255, 255)');
    this.sigs.last.signaturePad.clear(); // clearing is needed to set the background colour
  }

  public submit() {
    this.currentUser.digitalSignature = this.sigs.last.signature;
    this._authService.updateUserProfile(this.currentUser.id, this.currentUser).subscribe(
      (_resp) => {
        this.snackBar.open(this.translateService.instant('Digital Signature updated successfully'), this.translateService.instant('close'), {
          duration: GLOBAL.constants.DURATION,
          extraClasses: ['success']
        });
      });
    this.dialogRef.close();
  }

  public clear() {
    this.flag = true;
    this.sigs.last.clear();
  }

  public deleteSig() {
    this.currentUser.digitalSignature = '';
    this._authService.updateUserProfile(this.currentUser.id, this.currentUser).subscribe(
      (_resp) => {
        this.snackBar.open(this.translateService.instant('Digital Signature deleted successfully'), this.translateService.instant('close'), {
          duration: GLOBAL.constants.DURATION,
          extraClasses: ['success']
        });
      });
    this.digitalSign = '';
    this.flag = true;
  }
}
