import { DialogComponent } from '@pl-modules/dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { TranslateSericeStub } from './../../timesheet/timesheet.component.spec';
import { AuthService, TranslateService } from '@pl-core/_services';
import { TranslatePipe } from './../../../core/_pipes/translate.pipe';
import { MdDialogRef, MaterialModule, MdIcon, MdSnackBarModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { User } from '@pl-core/_models';

import { EmailSignatureComponent } from './email-signature.component';

let currentuser = {
  id: 100,
  username: 'donald.trump',
  email: 'd.trump@potus.gov.us',
  fname: 'Donald',
  lname: 'Trump',
  currentRole: 'CSA',
  roles: [{label: 'Clown in a Suit', value: 'CSA'}],
  currentLocation: '',
  locations: [],
  timeZone: 'A World of His Own',
  profilePicSno: '',
  numberFormat: '',
  token: '7687286-HFG',
  tenantId: '',
  ssobject: '',
  emailSignature: '',
  digitalSignature: '',
  agmKey: ''
};
class AuthServiceStub {
  public currentUser = jasmine.createSpy('currentUser').and.returnValue(currentuser);
  public updateUserProfile = jasmine.createSpy('updateUserProfile')
  .and.callFake(() => {
    return Observable.of(currentuser);
  });
  // public updateUserProfile(id,currentuser): Observable<any> {
  // return Observable.of(currentuser);
  // }
};

class TranslateServiceStub {
  public instant(key) {
    return key;
  }
}

class MdDialogRefMock {
  public close = jasmine.createSpy('close');
};

describe('EmailSignatureComponent', () => {
  let component: EmailSignatureComponent;
  let TranslateServiceMock = new TranslateServiceStub;
  // let dialogRef: MdDialogRef<DialogComponent>;
  let fixture: ComponentFixture<EmailSignatureComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, MdSnackBarModule, BrowserAnimationsModule],
      declarations: [ EmailSignatureComponent, QuillEditorComponent, TranslatePipe ],
      providers: [{provide: AuthService, useClass: AuthServiceStub},
                  {provide: TranslateService, useValue: TranslateServiceMock},
                  {provide: MdDialogRef, useClass: MdDialogRefMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    console.log(component.form);
  });

  it('should update the emailSiganture', 
  inject([AuthService, TranslateService, MdDialogRef], (authservice: AuthService, translateservice: TranslateService, DialogRef: MdDialogRef<DialogComponent> ) => {
   let key = "Updated";
   component.form.controls.editor.setValue('Prospecta signature');
   fixture.detectChanges();
   component.submit();   
   let spyonupdateUserProfile = authservice.updateUserProfile(currentuser.id, currentuser);
   spyonupdateUserProfile.subscribe((res) => {
    let spyoninstant = translateservice.instant(key);
    console.log(spyoninstant, 'spyoninstant');
    expect(spyoninstant).toBe(key);
   });
  }));

  it('Validation for setFocus() function', () => {
    let event = {
      focus : jasmine.createSpy('focus')
    };
    component.setFocus(event);
    expect(event.focus).toHaveBeenCalled();
  })


});
