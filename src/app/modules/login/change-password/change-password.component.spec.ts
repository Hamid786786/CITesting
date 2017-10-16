import { Subject } from 'rxjs/Subject';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IAuthResponse } from './../../../core/_interfaces/auth-response';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@pl-core/_services/translate/translate.service';
import { AlertService } from './../../../core/_services/alert/alert.service';
import { AuthService, ForgotPasswordService, LoadingService } from '@pl-core/_services';
import { ExceptionService } from '@pl-core/_services/utils/exception.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '@pl-core/_services';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from './../../../core/core.module';
import { ChangePasswordComponent } from './change-password.component';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

class LoginServiceStub {};
class ExceptionServiceStub {};
class ForgotPasswordServiceStub {
  public getUserName = jasmine.createSpy('getUserName');
  public getUserId = jasmine.createSpy('getUserId');
};
class AuthServiceStub {
  public redirectUrl: string;
  public navigate(redirectUrl) {
    return true;
  }
  // public changePassword = jasmine.createSpy('changePassword');
  public getUserById(id) {
    return Observable.of({});
  }
  public changePassword(id,userObj): Observable<any> {
    return Observable.of({});
  }
    public login(username: string, password: string): Observable<IAuthResponse> {
      return Observable.of({authenticated: true, error: 'None'});
    };
};
class AlertServiceStub {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  public success(message: string, keepAfterNavigationChange = false) {

    return ({type: 'success', text: message});
  }

  public error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    return {type: 'error', text: message};
  }
  public getMessage() {
    return Observable.of({});
  }
};
class LoadingServiceStub {
  public show = jasmine.createSpy('show').and.callFake(() => Observable.of(true));
  public hide = jasmine.createSpy('hide');
};
class TranslateServicestub {
  public instant = jasmine.createSpy('instant');
};

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, RouterTestingModule, HttpClientModule, BrowserAnimationsModule],
      declarations: [ ChangePasswordComponent ],
      providers: [ {provide: LoginService, useClass: LoginServiceStub},
                  {provide: ExceptionService, useClass: ExceptionServiceStub},
                  {provide: ForgotPasswordService, useClass: ForgotPasswordServiceStub},
                  {provide: AuthService, useClass: AuthServiceStub},
                  {provide: AlertService, useClass: AlertServiceStub},
                  {provide: LoadingService, useClass: LoadingServiceStub},
                  {provide: TranslateService, useClass: TranslateServicestub}
                   ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should login if the new password is valid', inject([AuthService, LoadingService], 
    (authService: AuthService, loadingService: LoadingService) =>{
    console.log(component.changeForm)
    let response = {
      authenticated : true,
      error: 'error message'
    }
    let userObj = {
      password: 'newJayant'
    }

    component.changeForm.controls.username.setValue('jayant');
    component.changeForm.controls.newpassword.setValue('newJayant');
    component.changeForm.controls.repeatpassword.setValue('newJayant');
    fixture.detectChanges();
    let spyonchangePassword = spyOn(authService,'changePassword');
    spyonchangePassword.and.returnValue(Observable.of(userObj));
    let spyon = spyOn(authService, 'login')
    spyon.and.returnValue(Observable.of(response));
    component.onSubmit();
    expect(loadingService.show).toHaveBeenCalled();
    expect(loadingService.hide).toHaveBeenCalled();
  }));

  it('Should not login if the new password is Invalid', inject([AlertService, AuthService, LoadingService], 
    (authService: AuthService, loadingService: LoadingService, alertService: AlertService) =>{
    console.log(component.changeForm);
    component.changeForm.controls.username.setValue('jayant');
    component.changeForm.controls.newpassword.setValue('newJayant');
    component.changeForm.controls.repeatpassword.setValue('Jayant');
    fixture.detectChanges();
    component.onSubmit();
    expect(component.changeError).toBe(true);
    // expect(alertService.error).toHaveBeenCalled();
  }));

  it('Should not login if authentication fails', inject([AuthService, LoadingService], 
    (authService: AuthService, loadingService: LoadingService) =>{
    console.log(component.changeForm)
    let response = {
      authenticated : false,
      error: 'error message'
    }
    let userObj = {
      password: 'newJayant'
    }
    component.changeForm.controls.username.setValue('jayant');
    component.changeForm.controls.newpassword.setValue('newJayant');
    component.changeForm.controls.repeatpassword.setValue('newJayant');
    fixture.detectChanges();
    let spyonchangePassword = spyOn(authService,'changePassword');
    spyonchangePassword.and.returnValue(Observable.of(userObj));
    let spyon = spyOn(authService, 'login')
    spyon.and.returnValue(Observable.of(response));
    component.onSubmit();
    expect(loadingService.hide).toHaveBeenCalled();
  }));

  it('Should not login if there is no response from the login function', inject([AuthService, LoadingService], 
    (authService: AuthService, loadingService: LoadingService) =>{
    console.log(component.changeForm)
    let response = {
    }
    let userObj = {
      password: 'newJayant'
    }
    component.changeForm.controls.username.setValue('jayant');
    component.changeForm.controls.newpassword.setValue('newJayant');
    component.changeForm.controls.repeatpassword.setValue('newJayant');
    fixture.detectChanges();
    let spyonchangePassword = spyOn(authService,'changePassword');
    spyonchangePassword.and.returnValue(Observable.of(userObj));
    let spyon = spyOn(authService, 'login')
    spyon.and.returnValue(Observable.of(response));
    component.onSubmit();
    expect(loadingService.hide).toHaveBeenCalled();
  }));

  it('check disableErrorMsg() function', () => {
    let changeError: any = true;
    component.disableErrorMsg();
    expect(component.changeError).toBe(false);
  });

});



