import { AuthService } from './../../../core/_services/auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertService } from './../../../core/_services/alert/alert.service';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {click} from '../../../testing/utils';
import {RouterStub, ExceptionServiceStub} from '../../../testing/stubs';
// Error: No provider for ExceptionService! in config/spec-bundle.js
// import {ExceptionServiceStub} from '@pl/testing/stubs';
// Imports for TestBed module metadata config
import {CommonModule} from '@angular/common';
import {CoreModule} from '@pl-core/core.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';
import {TranslatePipe} from '@pl-core/_pipes';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {LoginService, ForgotPasswordService, TranslateService, ExceptionService} from '@pl-core/_services';
import {IForgot} from '@pl-core/_interfaces';
import 'hammerjs';
import {ForgotPasswordComponent} from './forgot-password.component';
import 'rxjs/add/observable/of';

let comp: ForgotPasswordComponent;
let fixture: ComponentFixture<ForgotPasswordComponent>;
let de: DebugElement;
let page: Page;

class AlertServiceStub {
  public success = jasmine.createSpy('success');  
  public error = jasmine.createSpy('error');    
  public getMessage = jasmine.createSpy('getMessage').and.returnValue(
    Observable.of({
      message: 'text'
    })
  );  
}

class TranslateServiceStub {
  public currentLang: string;

  public use(lang: string) {
    this.currentLang = lang;
  }

  public instant(key: string) {
    return 'translated';
  }

  public instantWithLang(key: string, lang: string) {
    return `translated to ${lang}`;
  }
}

class LoginServiceStub {
  public getResources = jasmine.createSpy('getResources').and.callFake(
    () => Observable.of({
      logoURL: '#logo-url',
      logoALT: 'logo',
      slides: []
    })
  );
}
class ActivatedRouteStub {
  public tenantId = '';
  public params = {
    subscribe: () => {
      return this.tenantId = '123';
    }
  }

}

class ForgotPasswordServiceStub {
  public checkUser = () => {
    return status = '';
  }  // jasmine.createSpy('checkUser')//.and.callFake(
  //   // (username: string): Observable<IForgot> => {
  //   .and.returnValue(Observable.of({
  //       status: ''
  //     }
  //    ));
  // })
}

class SuccessMessageSpy {
  public send(username: string): Observable<IForgot> {
    return Observable.of({status: 200, message: 'Link Sent'});
  }
}

class ErrorMessageSpy {
  public send(username: string): Observable<IForgot> {
    return Observable.of({status: 404, message: 'Invalid User'});
  }
}

class Page {
  public onSubmitSpy: jasmine.Spy;

  public forgotPasswordFormComponent: DebugElement;
  public forgotForm: DebugElement;
  public logo: HTMLImageElement;
  public resMsg: HTMLParagraphElement;
  public usernameInput: HTMLInputElement;
  public submitBtn: HTMLButtonElement;

  constructor() {
    this.onSubmitSpy = spyOn(comp, 'onSubmit').and.callThrough();
    this.forgotPasswordFormComponent = de.query(By.css('pl-forgot-password'));
    this.forgotForm = de.query(By.css('#forgotForm'));
    // this.logo = de.query(By.css('#logo')).nativeElement;
    // this.resMsg = de.query(By.css('#responseMsg')).nativeElement;
    // this.usernameInput = de.query(By.css('[formControlName=username]')).nativeElement;
    // this.submitBtn = de.query(By.css('.login-button')).nativeElement;
  }
}

function createComponent(): void {
  fixture = TestBed.createComponent(ForgotPasswordComponent);
  comp = fixture.componentInstance;
  de = fixture.debugElement;
  page = new Page();

  // First change detection round triggers ngOnInit() and all
  // data/property/event bindings in the template
  fixture.detectChanges();
}

// --- End Declarations and helpers ---

// --- Tests ---

describe('ForgotPasswordComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      declarations: [ForgotPasswordComponent],
      schemas: [NO_ERRORS_SCHEMA], // ignore <pl-carousel>
      providers: [
        {provide: ForgotPasswordService, useClass: ForgotPasswordServiceStub},
        {provide: Router, useClass: RouterStub},
        FormBuilder,
        {provide: AlertService, useClass: AlertServiceStub},
        {provide: LoginService, useClass: LoginServiceStub},
        {provide: TranslateService, useClass: TranslateServiceStub},
        {provide: ExceptionService, useClass: ExceptionServiceStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    });

    createComponent();
  });
  it('should be created', () => {
      expect(comp).toBeTruthy();
  });

  it('Submit with the valid user', inject([ForgotPasswordService], (forgotpasswordService: ForgotPasswordService ) => {
    let response = {
      status: 200
    };
    let spyon = spyOn(forgotpasswordService, 'checkUser');
    spyon.and.returnValue(Observable.of(response));
    comp.onSubmit('username');
    expect(comp.showChangePassword).toBe(true);
  }));

  it('Submit with the Invalid user', inject([ForgotPasswordService, AlertService], (forgotpasswordService: ForgotPasswordService, alertService: AlertService ) => {
    let response = {
      status: 404
    };
    let spyon = spyOn(forgotpasswordService, 'checkUser');
    spyon.and.returnValue(Observable.of(response));
    comp.onSubmit('username');
    expect(comp.showChangePassword).toBe(false);
  }));

  it('check disableErrorMsg() function', () => {
    let forgotError: any = true;
    comp.disableErrorMsg();
    expect(comp.forgotError).toBe(false);
  })

  xdescribe('Unit tests - no embedded components', () => {

    xit('buildForm() should instantiate a fresh FormGroup', () => {
      expect(comp.forgotForm.contains('username')).toBe(true);
      expect(comp.forgotForm.valid).toBe(false);
      expect(comp.forgotForm.pristine).toBe(true);
      expect(comp.forgotForm.untouched).toBe(true);
    });

    describe('Forgot Password Panel', () => {
      xit('should have a logo', () => {
        expect(page.logo).toBeDefined();
        expect(page.logo.alt).toEqual(comp.logoALT);
        expect(page.logo.src).toContain(comp.logoURL);
      });

      xit('should have username', () => {
        expect(page.usernameInput).toBeDefined();
      });

      xit('should submit the form when a submit event is raised', () => {
        page.forgotForm.triggerEventHandler('ngSubmit', null);
        expect(page.onSubmitSpy.calls.any()).toBe(true);
        expect(comp.forgotForm.valid).toBe(false);
      });

      xit('should submit the form when submit button is clicked', () => {
        click(page.submitBtn);
        expect(page.onSubmitSpy.calls.any()).toBe(true);
        expect(comp.forgotForm.valid).toBe(false);
      });
    });

    // describe('checkUser()', () => {
    //     let forgotPasswordService : ForgotPasswordService;
    //     let username: string;

    //     beforeEach(() => {
    //         forgotPasswordService = de.injector.get(ForgotPasswordService);
    //     });
    //     xit('should send response back to the user', () => {
    //         page.usernameInput.value = 'username';
    //         page.usernameInput.dispatchEvent(new Event('input'));

    //         // Let Angular know DOM has changed
    //         fixture.detectChanges();
    //         comp.onSubmit(username);

    //         expect(page.resMsg.contains).toEqual(comp.responseMsg);
    //     });
    // });
  });
});
