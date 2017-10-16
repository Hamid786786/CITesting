import {ComponentFixture, TestBed, fakeAsync, tick, inject, TestComponentRenderer} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {click} from '@pl/testing/utils';
import {RouterStub} from '@pl/testing/stubs';

import {CoreModule} from '@pl-core/core.module';
import {LoginComponent} from '@pl-modules/login/login.component';
import {TranslatePipe} from '@pl-core/_pipes';

// Import dependencies in name only, for the component under test
// Must configure in TestBed later
import { ActivatedRoute, Params } from '@angular/router';
import {AuthService} from '@pl-core/_services';
import {
  PaletteConfiguratorService,
  PaletteFetcherService,
  TranslateService,
  LoginService,
  MetaService
} from '@pl-core/_services';
import {User} from '@pl-core/_models';
import 'hammerjs';
import {RouterTestingModule} from "@angular/router/testing";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// --- Declarations and helpers ---
let comp: LoginComponent;
let fixture: ComponentFixture<LoginComponent>;
let de: DebugElement;
let page: Page;

class MetaServiceSpy {
  public setTitle = jasmine.createSpy('setTitle');

  public setFavicon = jasmine.createSpy('setFavicon');
}

class AuthServiceSpy {
  public setTenantID = jasmine.createSpy('setTenantID');
  // TODO, add the neccasary functions

}

class ActivatedRouteStub {
  public children: any = [
    {
      params: {
       value: {tenentId: ''}
      }
    },
    {
      params: {
        value: {tenentId: ''}
      }
    }
  ];
  constructor() {
    this.children[0].params['value']['tenentId'] = 'PC101';
    this.children[1].params['value']['tenentId'] = 'PC102';
  }
}

class LoginServiceSpy {
  public getResources = jasmine.createSpy('getResources').and.callFake(
    () => Observable.of({
      logoURL: '#logo-url',
      logoALT: 'logo',
      slides: []
    })
  );
}

// Represents the component under test and aggregates all
// DOM elements/DebugElements/spies into one class
class Page {

  public carousel: DebugElement;
  public loginFormComponent: DebugElement;
  public topnav: DebugElement;

  constructor() {
    this.carousel = de.query(By.css('pl-carousel'));
    this.loginFormComponent = de.query(By.css('login-form'));
    this.topnav = de.query(By.css('pl-top-nav'));
  }
}

function createComponent(): void {
  fixture = TestBed.createComponent(LoginComponent);
  comp = fixture.componentInstance;
  de = fixture.debugElement;
  page = new Page();

  // First change detection round triggers ngOnInit() and all
  // data/property/event bindings in the template
  fixture.detectChanges();
}
// --- End Declarations and helpers ---

// --- Tests ---
describe('LoginComponent', () => {
  let ActivatedRouteMock;
  beforeEach(() => {
    console.log(this.id, 'login componnet id', this.route, page);
    ActivatedRouteMock = new ActivatedRouteStub();
    // TranslatePipe not stubbed but it uses the stubbed TranslateService
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        RouterTestingModule
      ],
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA], // ignore <pl-carousel>
      providers: [
        {provide: LoginService, useClass: LoginServiceSpy},
        {provide: MetaService, useClass: MetaServiceSpy},
        {provide: AuthService, useClass: AuthServiceSpy},
        {provide: ActivatedRoute, useValue: ActivatedRouteMock}
      ]
    });

    createComponent();

  });

  describe('Unit tests - no embedded component', () => {

    it('should have a carousel & form and topnav', () => {
      expect(page.carousel).toBeDefined();
      expect(page.loginFormComponent).toBeDefined();
      expect(page.topnav).toBeDefined();
    });

    it('should call login service and set slides',
      inject([LoginService], (loginService: LoginServiceSpy) => {
        expect(loginService.getResources.calls.count()).toEqual(1);
        expect(fixture.componentInstance.slides).toBeDefined();
        expect(fixture.componentInstance.slides.length).toEqual(0);
      }));

    it('should call meta service to set title and favicon',
      inject([MetaService], (metaService: MetaServiceSpy) => {
        expect(metaService.setFavicon.calls.count()).toEqual(0);
        metaService.setFavicon();
        expect(metaService.setFavicon.calls.count()).toEqual(1);
        expect(metaService.setTitle.calls.count()).toEqual(0);
        metaService.setTitle();
        expect(metaService.setTitle.calls.count()).toEqual(1);
      }));

  });

});
