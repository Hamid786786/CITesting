import {Component, OnInit} from '@angular/core';
import {User} from '@pl-core/_models';
import {AuthService} from '../../../core/_services/auth/auth.service';
import {Router} from '@angular/router';
import {GLOBAL} from '@pl-core/_config';
import {MdDialog, MdSnackBar} from '@angular/material';
import {DigitalSignatureComponent} from '../digital-signature/digital-signature.component';
import {EmailSignatureComponent} from '../email-signature/email-signature.component';
import {TranslateService} from '@pl-core/_services/translate/translate.service';

@Component({
  selector: 'app-profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.scss']
})
export class ProfileNavNewComponent implements OnInit {
  public currentUser: User;
  public digitalSigImage: string;
  public emailSightml: string;
  public userIsEditabelFields: any = {};
  public useDefaultProfileImage: boolean = false;
  public showChangedImage: boolean = false;
  public firstLetterFirstName: string;
  public lastLetterFirstName: string;
  public defaultImage: string;
  private base64textString: any = '';

  constructor(private _authService: AuthService,
              private snackBar: MdSnackBar,
              public translateService: TranslateService,
              public dialog: MdDialog) {
  }

  public ngOnInit() {
    this.currentUser = this._authService.currentUser();
    if (this.currentUser.profilePicSno === '' || this.currentUser.profilePicSno === undefined || this.currentUser.profilePicSno === null) {
      this.useDefaultProfileImage = true;
      this.showChangedImage = false;
      if (this.currentUser.fname) {
        this.firstLetterFirstName = this.currentUser.fname.charAt(0);
      }
      if (this.currentUser.lname) {
        this.lastLetterFirstName = this.currentUser.lname.charAt(0);
      }
      if ((!this.currentUser.fname) && (!this.currentUser.lname)) {
        this.defaultImage = this.currentUser.username;
      }
    }
  }

  public digitalSignatureDialog(): void {
    let dialogRef = this.dialog.open(DigitalSignatureComponent, {
      disableClose: true,
      panelClass: 'digital-signature-modal'
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.digitalSigImage = result;
    });
  }

  public emailSignatureDialog(): void {
    let dialogRef = this.dialog.open(EmailSignatureComponent, {
      disableClose: true,
      panelClass: 'email-signature-modal'
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.emailSightml = result;
    });
  }

  public handleFileSelect(evt) {
    let files = evt.target.files;
    let file = files[0];
    if (!file) {
      return;
    }

    if (files && file) {
      if (this.isValidExtension(file) === false) {
        this.snackBar.open(this.translateService.instant('Invalid File Format'), this.translateService.instant('close'), {
          duration: GLOBAL.constants.DURATION,
          extraClasses: ['error']
        });
        return false;
      }
      let reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  public _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.currentUser.profilePicSno = this.base64textString;
    this.showChangedImage = true;
    this.makeEditable('profilePicSno');
    this.updateInfo('profilePicSno', this.currentUser.profilePicSno, 'Profile Picture');
  }

  public isValidExtension(file: File): boolean {
    let allowedExtensions = GLOBAL.constants.PROFILE_PIC_ALLOWEDEXTENSIONS;
    let extension = file.name.split('.').pop();
    return allowedExtensions.indexOf(extension.toLowerCase()) !== -1;
  }

  public makeEditable(type) {
    this.userIsEditabelFields[type] = !this.userIsEditabelFields[type];
  };

  public updateInfo(type, value, info) {
    this.userIsEditabelFields[type] = false;
    let back = this.translateService.instant(' updated successfully');
    let front = this.translateService.instant(`${info}`);
    let message = front + ' ' + back;
    this._authService.updateUserProfile(this.currentUser.id, this.currentUser).subscribe(
      (_resp) => {
        if (type === 'profilePicSno') {
          this.useDefaultProfileImage = false;
        }
        this.snackBar.open(`${message}`, this.translateService.instant('close'), {
          duration: GLOBAL.constants.DURATION,
          extraClasses: ['success']
        });
      });
  }

  public profileImageBroken() {
    this.useDefaultProfileImage = true;
  }

  public stopClickPropagate(event: any) {
    event.stopPropagation();
  }

  public logout() {
    this._authService.logout();
  }
}
