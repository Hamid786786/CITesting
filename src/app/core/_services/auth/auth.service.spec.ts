import {TestBed} from '@angular/core/testing';
//import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpModule, Http, BaseRequestOptions, XHRBackend} from '@angular/http';
import {CoreModule} from '@pl-core/core.module';
import {AuthService} from './auth.service';
import {PaletteConfiguratorService} from '../palette/palette-configurator.service';
import {PaletteFetcherService} from '../palette/palette-fetcher.service';
import {Router} from '@angular/router';
import {RouterStub} from '@pl/testing/stubs';
import {Palette} from '@pl-core/_models';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let auth: AuthService;
let http: Http;
let _paletteConfigurator: PaletteConfiguratorService;
let _paletteFetcher: PaletteFetcherService;
let _router: Router;

class PaletteConfiguratorServiceStub {
  public populateAppColors(palette: Palette) {
    // Do Nothing
  }
}

class PaletteFetcherServiceStub {
  public getApplicationPalette(): Observable<Palette> {
    return Observable.of({
      primaryColor: 'rgba(0, 137, 5, 1)',
      secondaryColor: 'rgba(66, 224, 72, 1)',
      tertiaryColor: 'rgba(101, 214, 116, 1)',
      primaryBGColor: 'rgba(245, 245, 245, 1)',
      secondaryBGColor: 'rgba(250, 250, 250, 1)',
      tertiaryBGColor: 'rgba(248, 248, 248, 1)',
      textColor: 'rgba(255, 255, 255, 1)',
      textBGColor: 'rgba(0, 0, 0, 1)',
      textSecondaryBGColor: 'rgba(170, 170, 170, 1)'
    });
  }

  public getTenantPalette(tenantId: string): Observable<Palette> {
    return Observable.of({
      primaryColor: 'rgba(0, 137, 5, 1)',
      secondaryColor: 'rgba(66, 224, 72, 1)',
      tertiaryColor: 'rgba(101, 214, 116, 1)',
      primaryBGColor: 'rgba(245, 245, 245, 1)',
      secondaryBGColor: 'rgba(250, 250, 250, 1)',
      tertiaryBGColor: 'rgba(248, 248, 248, 1)',
      textColor: 'rgba(255, 255, 255, 1)',
      textBGColor: 'rgba(0, 0, 0, 1)',
      textSecondaryBGColor: 'rgba(170, 170, 170, 1)'
    });
  }
}

describe('Service: AuthService', () => {
  beforeEach(() => {
    // Provide TestBed module with stubs to alias injected services
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [
        {provide: Router, useClass: RouterStub},
        {provide: PaletteConfiguratorService, useClass: PaletteConfiguratorServiceStub},
        {provide: PaletteFetcherService, useClass: PaletteFetcherServiceStub}
      ]
    });

    // Get instances of the stubbed services from TestBed's injector
    http = TestBed.get(Http);
    _router = TestBed.get(Router);
    _paletteConfigurator = TestBed.get(PaletteConfiguratorService);
    _paletteFetcher = TestBed.get(PaletteFetcherService);

    // Instantiate the service under test with these stubs
    auth = new AuthService(http, _paletteConfigurator, _paletteFetcher, _router);

  });

  it('should not be authenticated on init', () => {
    expect(auth.isAuthenticated()).toBe(false);
    expect(auth.currentUser()).toBe(null);
  });

  it('should be authenticated on successful login', () => {

    // Simulating authentication
    localStorage.setItem('currentUser', JSON.stringify({
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
      token: '7687286-HFGJ'
    }));

    expect(auth.isAuthenticated()).toBe(true);
    expect(auth.currentUser().username).toBe('donald.trump');
    expect(auth.currentUser().currentRole).toBe('CSA');

  });

  // Redo login test

  // Logout test
  it('after logout() should not be authenticated', () => {
    auth.logout();
    expect(auth.isAuthenticated()).toBe(false);
  });
});
