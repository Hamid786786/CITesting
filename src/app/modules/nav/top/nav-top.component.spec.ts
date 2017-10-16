/**
 *  TODO:
 *  - onSubmit(), search, and role change when they have a
 *    meaningful implementation
 */

import {ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement, NO_ERRORS_SCHEMA, InjectionToken} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient,HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {ILogo, ISelectItem} from '@pl-core/_interfaces';
import {User} from '@pl-core/_models';
import {click} from '@pl/testing/utils';
import {RouterStub} from '@pl/testing/stubs';
import {CoreModule} from '@pl-core/core.module';

import {TopNavComponent} from './nav-top.component';
import {SearchComponent} from '../../shared/search/search.component';

import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService, NavService, TranslateService, LoginService, GlobalService, MetaService} from '@pl-core/_services';
import {TranslatePipe} from '@pl-core/_pipes';
import {ExceptionService} from '@pl-core/_services/utils/exception.service';


// --- Declarations and helpers ---
let comp: TopNavComponent;
let fixture: ComponentFixture<TopNavComponent>;
let de: DebugElement;
let page: Page;

let authService: AuthService;

class NavServiceStub {
  public sidebarOpen: Observable<boolean>;

  public toggleSidebar() {
    return null;
  }

  public getLogo(): Observable<ILogo> {
    return Observable.of({
      logoURL: '#grabbed-by-the-cat',
      logoALT: 'cat grabber'
    });
  }

  public getRoles(): Observable<ISelectItem[]> {
    return Observable.of([
      {label: 'popcorn', value: 'chicken'}
    ]);
  }
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

class InjectionTokenStubs {}

class AuthenticatedServiceStub {
  public redirectUrl: string;

  public login(): Observable<any> {
    return Observable.of(null);
  }

  public logout(): void {
    return null;
  }

  public isAuthenticated(): boolean {
    return true;
  }

  public getTenantID():any {
    return 'PC101';
  }

  public currentUser(): User {
    return {
      id: 1,
      username: 'donald.trump',
      email: 'd.trump@potus.gov.us',
      fname: 'Donald',
      lname: 'Trump',
      currentRole: 'CSA',
      roles:[{label: 'Clown in a Suit', value: 'CSA', isAutherized: false, widgets: [], action: null}],
      currentLocation: 'WDC',
      locations: [{label: 'Clown in a Suit', value: 'CSA', isAutherized: false, widgets: [], action: null}],
      timeZone: 'A World of His Own',
      profilePicSno: '',
      numberFormat: '',
      token: '7687286-HFGJ',
      tenantId: 'PC101',
      ssobject: '273',
      emailSignature: 'value',
      digitalSignature: 'string',
      agmKey: 'value'
    };
  }
}

class UnAuthenticatedServiceStub {
  public redirectUrl: string;

  public login(): Observable<any> {
    return Observable.of(null);
  }

  public logout(): void {
    return null;
  }

  public isAuthenticated(): boolean {
    return false;
  }

  public currentUser(): User {
    return null;
  }
}

// Represents the component under test and aggregates all
// DOM elements/DebugElements/spies into one class
class Page {
  public searchSpy: jasmine.Spy;
  public changeRoleSpy: jasmine.Spy;
  public changeLocationSpy: jasmine.Spy;
  public toggleSidebarSpy: jasmine.Spy;
  public toggleProfileSpy: jasmine.Spy;

  // profileTab: DebugElement;
  public searchForm: DebugElement;
  public roleForm: DebugElement;
  public locationForm: DebugElement;
  public sidebarToggler: DebugElement;
  public profileToggler: DebugElement;
  public logo: HTMLImageElement;
  public searchInput: HTMLInputElement;
  public roleInput: HTMLInputElement;
  public welcomeSpan: HTMLSpanElement;

  constructor() {
    //this.searchSpy = spyOn(comp, 'search');
    this.changeRoleSpy = spyOn(comp, 'changeRole');
    this.changeLocationSpy = spyOn(comp, 'changeLocation');
    this.toggleSidebarSpy = spyOn(comp, 'toggleSidebar').and.callThrough();
    this.toggleProfileSpy = spyOn(comp, 'toggleProfile').and.callThrough();

    this.logo = de.query(By.css('.brand-icon > img')).nativeElement;
  }

  public getPageElements() {
    // Some elements only rendered after logging in
    if (true) {
      // this.profileTab = de.query(By.css('pl-nav-profile'));
      this.searchForm = de.query(By.css('.searchForm'));
      this.roleForm = de.query(By.css('.roleForm'));
      this.locationForm = de.query(By.css('.locationForm'));
      this.sidebarToggler = de.query(By.css('.menu-button'));
      this.profileToggler = de.query(By.css('.user-link'));
      this.searchInput = de.query(By.css('[formControlName=search]')).nativeElement;
      this.roleInput = de.query(By.css('[formControlName=role]')).nativeElement;
      this.welcomeSpan = de.query(By.css('.user-link > label')).nativeElement;
    }
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

function createComponent(): void {
  fixture = TestBed.createComponent(TopNavComponent);
  comp = fixture.componentInstance;
  de = fixture.debugElement;
  page = new Page();
  // First change detection round triggers ngOnInit() and all
  // data/property/event bindings in the template
  fixture.detectChanges();
}
// --- End Declarations and helpers ---

// --- Tests ---
describe('TopNavComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        HttpClientModule,
        BrowserAnimationsModule        
      ],
      declarations: [TopNavComponent, SearchComponent],
      schemas: [NO_ERRORS_SCHEMA], // ignore <pl-profile-tab>
      providers: [
        {provide: AuthService, useClass: AuthenticatedServiceStub},
        {provide: NavService, useClass: NavServiceStub},
        {provide: Router, userClass: RouterStub},
        {provide: LoginService, useClass: LoginServiceStub},
        {provide: TranslateService, useClass: TranslateServiceStub},
        MetaService,
        GlobalService,
        HttpClient,
        ExceptionService,

        FormBuilder
      ]
    });

    createComponent();
    authService = de.injector.get(AuthService);
  });


  describe('Unit tests', () => {

    it('should have a logo', () => {
      expect(page.logo).toBeDefined();
      expect(page.logo.alt).toContain(comp.logoAlt);
      expect(page.logo.src).toContain(comp.logoUrl);
    });

    it('should not have rendered other elements yet', () => {
      expect(page.sidebarToggler).toBeUndefined();
      expect(page.searchInput).toBeUndefined();
      expect(page.roleInput).toBeUndefined();
      expect(page.welcomeSpan).toBeUndefined();
    });

    it('should check authentication from AuthService', () => {
      expect(comp.currentUser).toEqual(authService.currentUser());
    });

    // Redo toggleProfile test with emitter

  });

});

// Test when authenticated
describe('When authenticated', () => {
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        HttpClientModule,
        BrowserAnimationsModule   
      ],
      declarations: [TopNavComponent, SearchComponent],
      schemas: [NO_ERRORS_SCHEMA], // ignore <pl-profile-tab>
      providers: [
        {provide: AuthService, useClass: AuthenticatedServiceStub},
        {provide: NavService, useClass: NavServiceStub},
        {provide: TranslateService, useClass: TranslateServiceStub},
        {provide: LoginService, useClass: LoginServiceStub},
        {provide: Router, userClass: RouterStub},
         MetaService,
        GlobalService,
        HttpClient,
        ExceptionService,

        FormBuilder
      ]
    });

    createComponent();

    authService = de.injector.get(AuthService);

    // Need to update ngIf bindings with another round of
    // change detection so elements are rendered in DOM
    fixture.detectChanges();

    page.getPageElements();
  });

  xit('clicking sidebar icon should toggle the sidebar', () => {
    click(page.sidebarToggler);

    expect(page.toggleSidebarSpy.calls.any()).toBe(true);
  });

  xit('clicking profile label should toggle the profile panel', () => {
    click(page.profileToggler);

    expect(page.toggleProfileSpy.calls.any()).toBe(true);
  });

  xit('search form should submit', () => {
    page.searchForm.triggerEventHandler('ngSubmit', null);

    expect(page.searchSpy.calls.any()).toBe(true);
  });

  // No need to check role. Just check for currentUser

  xit('should welcome the current user', () => {
    expect(page.welcomeSpan.textContent).toContain(`${comp.currentUser.fname + ' ' + comp.currentUser.lname}`);
  });
});
