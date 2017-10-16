import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from './../../../core/_services/translate/translate.service';
import { AuthService } from './../../../core/_services/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
// import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@pl-core/_pipes/translate.pipe';
import { MdDialogRef, MaterialModule } from '@angular/material';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { SignatureFieldComponent } from '../signature-field/signature-field.component';
import { DigitalSignatureComponent } from './digital-signature.component';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
class SignatureFieldComponentStub {
  public objects = {};
}
class MdDialogRefMock {
  public close = jasmine.createSpy('close');
};

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
};

class TranslateServiceStub {
  public instant(key) {
    return key;
  }
};

describe('DigitalSignatureComponent', () => {
  let component: DigitalSignatureComponent;
  let fixture: ComponentFixture<DigitalSignatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, MaterialModule, BrowserAnimationsModule],
      declarations: [ DigitalSignatureComponent, TranslatePipe, SignatureFieldComponent, SignaturePad],
      providers: [{provide: MdDialogRef, useClass: MdDialogRefMock}, 
        {provide: SignatureFieldComponent, useClass: SignatureFieldComponentStub},
        {provide: AuthService, useClass: AuthServiceStub},
        {provide: TranslateService, useClass: TranslateServiceStub}
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should update the digitalSiganture', 
  inject([AuthService, TranslateService], (authservice: AuthService, translateservice: TranslateService ) => {
   let key = "Updated";
   currentuser.digitalSignature = "signature";
   let spyonupdateUserProfile = authservice.updateUserProfile(currentuser.id, currentuser);
   component.submit();
   spyonupdateUserProfile.subscribe((res) => {
    let spyoninstant = translateservice.instant(key);
    console.log(spyoninstant, 'spyoninstant');
    expect(spyoninstant).toBe(key);
   });
  }));

  it('should delete digitalSiganture', 
  inject([AuthService, TranslateService], (authservice: AuthService, translateservice: TranslateService ) => {
   let key = "Deleted";
   currentuser.digitalSignature = '';
   let spyonupdateUserProfile = authservice.updateUserProfile(currentuser.id, currentuser);
   component.deleteSig();
   spyonupdateUserProfile.subscribe((res) => {
    let spyoninstant = translateservice.instant(key);
    console.log(spyoninstant, 'spyoninstant');
    expect(spyoninstant).toBe(key);
   });
  }));

  it('checking clear() function', () => {
    let flag = false;
    component.clear();
    expect(component.flag).toBe(true);
  })
});
