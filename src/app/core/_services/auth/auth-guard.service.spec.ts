// AuthGuard injects AuthService and the Router, so we should use a
// test stub for these dependencies

import {TestBed} from '@angular/core/testing';
import {AuthGuard} from './auth-guard.service';
import {RouterStub} from '@pl/testing/stubs';
import {Observable} from 'rxjs/Observable';
// Import dependencies in name only, for the class under test
// Must configure in TestBed later
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {User} from '@pl-core/_models';
import 'rxjs/add/observable/of';
let guard: AuthGuard;
let auth: AuthService;
let router: Router;

let checkLoginSpy: jasmine.Spy;
let navigateSpy: jasmine.Spy;

const mockRedirect = 'mock/url';

class UnAuthenticatedServiceStub {
  private redirectUrl: string;

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

class AuthenticatedServiceStub {
  private redirectUrl: string;

  public login(): Observable<any> {
    return Observable.of(null);
  }

  public logout(): void {
    return null;
  }

  public isAuthenticated(): boolean {
    return true;
  }

  public currentUser(): User {
    return {
      id: 123,
      username: 'donald.trump',
      email: 'd.trump@potus.gov.us',
      fname: 'Donald',
      lname: 'Trump',
      currentRole: 'CSA',
      roles:[{label: 'Clown in a Suit', value: 'CSA', isAutherized: false, widgets: [], action: null}],
      currentLocation: '',
      locations: [{label: 'Clown in a Suit', value: 'CSA', isAutherized: false, widgets: [], action: null}],
      timeZone: 'A World of His Own',
      profilePicSno: '',
      numberFormat: '',
      token: '7687286-HFGJ',
      tenantId: 'PC101',
      ssobject: '101',
      emailSignature: 'value',
      digitalSignature: 'string',
      agmKey: 'value'
    };
  }
}

describe('Service: AuthGuard', () => {
  beforeEach(() => {
    // Provide TestBed module with stubs to alias injected services
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useClass: UnAuthenticatedServiceStub},
        {provide: Router, useClass: RouterStub}
      ]
    });

    // Get instances of the stubbed services from TestBed's injector
    auth = TestBed.get(AuthService);
    router = TestBed.get(Router);

    // Instantiate the service under test with these stubs
    guard = new AuthGuard(auth, router);

    // Spies are test doubles for functions, and mask its
    // implementation - to call the actual function we need to
    // chain and.callThrough()
    checkLoginSpy = spyOn(guard, 'checkLogin').and.callThrough();
    navigateSpy = spyOn(router, 'navigate');
  });

  it('canActivate() should return false initially', () => {
    expect(guard.canActivate(<any> {}, <any> {})).toBe(false);
    expect(checkLoginSpy.calls.any()).toBe(true);
  });

  it('canActivateChild() should behave identically to canActivate()', () => {
    expect(guard.canActivateChild(<any> {}, <any> {})).toBe(false);
  });

  it('checkLogin() should store redirect URL and navigate to login page', () => {
    guard.checkLogin(mockRedirect);

    expect(auth.redirectUrl).toEqual(mockRedirect);
    expect(navigateSpy).toHaveBeenCalledWith(['/login/default']);
  });

});

// Test when authenticated
describe('When authenticated', () => {
  beforeEach(() => {

    // Provide TestBed module with stubs to alias injected services
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useClass: AuthenticatedServiceStub},
        {provide: Router, useClass: RouterStub}
      ]
    });

    // Get instances of the stubbed services from TestBed's injector
    auth = TestBed.get(AuthService);
    router = TestBed.get(Router);

    // Instantiate the service under test with these stubs
    guard = new AuthGuard(auth, router);

    // Spies are test doubles for functions, and mask its
    // implementation - to call the actual function we need to
    // chain and.callThrough()
    checkLoginSpy = spyOn(guard, 'checkLogin').and.callThrough();
    navigateSpy = spyOn(router, 'navigate');
  });

  it('canActivate() should return true after authentication', () => {
    expect(guard.canActivate(<any> {}, <any> {})).toBe(true);
  });

  it('canActivateChild() should behave identically to canActivate()', () => {
    expect(guard.canActivateChild(<any> {}, <any> {})).toBe(true);
  });

});
