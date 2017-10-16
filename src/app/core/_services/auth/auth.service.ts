import {Injectable, EventEmitter, Output} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {ISelectItem, IAuthResponse} from '@pl-core/_interfaces';
import {User} from '@pl-core/_models';
import {CONFIG} from '@pl-core/_config';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {PaletteConfiguratorService} from '../palette/palette-configurator.service';
import {PaletteFetcherService} from '../palette/palette-fetcher.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import { GLOBAL} from '@pl-core/_config';
import {CreateWidgetService} from '@pl-core/_services/dashboardWidgets/createWidgetService.service';

@Injectable()
export class AuthService {

  public static readonly CURRENT_USER: string = 'currentUser';
  public static readonly CURRENT_TENANT: string = 'currentTenantId';
  public static readonly CURRENT_TENANT_PRIMARY_COLOR: string = 'primaryColor';
  public redirectUrl: string;
  // Tenant id can be passed to login page to load a particular tenants login page.
  // This variable will store that tenant id to be used for login and logout.
  // In app tenant id will still be governed by user login.
  public tenantIdForLogin: string;
 // public getWidgets$: Observable<any>;
  public getTenantID$: Observable<any>;
  public getMapKey$: Observable<any>;
  public roleChangeObservable$: Observable<any>;

  // Event emitted when current role is changed
  @Output() public roleChangeEventEmitter: EventEmitter<string> = new EventEmitter(true);

  // Event emitted when current location is changed
  @Output() public locationChangeEventEmitter: EventEmitter<string> = new EventEmitter(true);
  private _tenantPaletteSub: Subscription;
  // private widgetSubject: Subject<boolean>;
  private tenantIdSubject: Subject<boolean>;
  private mapKeySubject: Subject<any>;
  private roleChangeSubject: Subject<any>;

  constructor(private _http: Http,
              private _paletteConfigurator: PaletteConfiguratorService,
              private _paletteFetcher: PaletteFetcherService,
              private _router: Router
            ) {
//    this.widgetSubject = new Subject<boolean>();
    this.tenantIdSubject = new Subject<boolean>();
    this.mapKeySubject = new Subject<any>();
     // LIstener for role change
    this.roleChangeSubject = new Subject<any>();

  //  this.getWidgets$ = this.widgetSubject.asObservable();
    this.getTenantID$ = this.tenantIdSubject.asObservable();
    this.getMapKey$ = this.mapKeySubject.asObservable();
    this.roleChangeObservable$ = this.roleChangeSubject.asObservable();
  }
  public updateMapKey() {
    let mapKey = this.currentUser().agmKey;
    this.mapKeySubject.next(mapKey);
  }
  public login(username: string, password: string): Observable<IAuthResponse> {
    // TODO, need to change the http.get =>http.post if the api wants the request to be POST
    return this._http.get(CONFIG.urls.authenticate + '?username=' + username + '&password=' + password)
      .map((response: Response) => {
        if (response.json().length === 0) {
          return {authenticated: false, error: 'Username or Password Invalid'};
        }
        let user: any = response.json()[0];
        if (user === undefined || user.error) {
          return {authenticated: false, error: user.error};
        }
        // login successful if there's a jwt token in the response
        if (user && user.token && user.username === username && user.password === password && user.status === 200) {
          // store user details and jwt token iaddWidgetn local storage to keep user logged in between page refreshes
          localStorage.setItem('AuthorizationToken', user.token);
          this.setUser(user);
          this.updateMapKey();
          if (user.tenantId) {
            this.setTenantID(user.tenantId);
          }
          this.setTenantPalette();
          return {authenticated: true, error: 'None'};
        }
        if (user.username !== username || user.password !== password || user.status === 401) {
          return {authenticated: false, error: 'Username or Password Invalid'};
        }
      });
  }
  public getUserById(id) {
    return this._http.get( CONFIG.urls.authenticate + '/' + id)
      .map((response: Response) => {
        let  user: any = response.json();
        return user;
      });
  }
  public changePassword(id, userObj) {
    return this._http.put( CONFIG.urls.authenticate + '/' + id, userObj)
      .map((response: Response) => {
        let user: any = response.json();
        return user;
      });
  }
  public updateUserProfile(id, userObj) {
    return this._http.put( CONFIG.urls.authenticate + '/' + id, userObj)
      .map((response: Response) => {
        let user: any = response.json();
        this.setUser(user);
        return user;
      });
  }
  /**
   * logout and navigate to login
   */
  public logout(): void {
    let tid = this.getTenantID();
    this.logoutInternal();
    if (tid) {
      this._router.navigate(['/login/default/' + tid]);
    } else {
      this._router.navigate(['/login/default']);
    }
  }

  /**
   * logout and navigate to provided url
   */
  public logoutAndRedirectTo(url: string): void {
    this.logoutInternal();
    this._router.navigate([url]);
  }

  public isAuthenticated(): boolean {
    if (localStorage.getItem(AuthService.CURRENT_USER)) {
      return true;
    }
    return false;
  }

  public currentUser(): User {
    if (localStorage.getItem(AuthService.CURRENT_USER)) {
      return JSON.parse(localStorage.getItem(AuthService.CURRENT_USER));
    } else {
      return null;
    }
  }

  public  setTenantID(tId) {
    this.tenantIdForLogin = tId;
    // CURRENT_TENANT
    this.tenantIdSubject.next(tId);
    localStorage.setItem(AuthService.CURRENT_TENANT, this.tenantIdForLogin);
  }

  public getTenantID() {
    return localStorage.getItem(AuthService.CURRENT_TENANT);
  }

  public setCurrentRole(role: string): void {
    if (this.isAuthenticated()) {
      let currentUser: User = this.currentUser();
      if (currentUser.currentRole === role) {
        return;
      }
      for (let roleI of currentUser.roles) {
        if (roleI.value === role) {
          currentUser.currentRole = role;
          this.setUser(currentUser);
          localStorage.setItem('selectedRole', role);
          this.roleChangeEventEmitter.emit(role);
          this.roleChangeSubject.next(true);
        }
      }
    }
  }

  public setCurrentLocation(location: string): void {
    if (this.isAuthenticated()) {
      let currentUser: User = this.currentUser();
      if (currentUser.currentLocation === location) {
        return;
      }
      for (let loc of currentUser.locations) {
        if (loc.value === location) {
          currentUser.currentLocation = location;
          this.setUser(currentUser);
          this.locationChangeEventEmitter.emit(location);
        }
      }
    }
  }

  public setTenantPalette(): void {
    let tenantId = this.currentUser().tenantId;
    tenantId = tenantId || tenantId === '' ? tenantId : '0';
    if (tenantId === '0') {
      this._tenantPaletteSub = this._paletteFetcher.getApplicationPalette()
        .subscribe((palette) => {
          this._paletteConfigurator.populateAppColors(palette);
        });
    } else {
      this._tenantPaletteSub = this._paletteFetcher.getTenantPalette(tenantId)
        .subscribe((palette) => {
          this._paletteConfigurator.populateAppColors(palette);
        });
    }
  }

  private logoutInternal(): void {
    // remove user from local storage to log user out
    localStorage.removeItem(AuthService.CURRENT_USER);
    localStorage.removeItem(AuthService.CURRENT_TENANT);
    // unsubscribe from the tenant palette
    if (this._tenantPaletteSub) {
      this._tenantPaletteSub.unsubscribe();
    }
    // reload app palette
    this._tenantPaletteSub = this._paletteFetcher.getApplicationPalette()
      .subscribe((palette) => {
        this._paletteConfigurator.populateAppColors(palette);
        // unsubscribe from the app palette
        if (this._tenantPaletteSub) {
          this._tenantPaletteSub.unsubscribe();
        }
      });
  }

  private setUser(user: User): void {
    // set user in local storage to log user in or persist changes like role and location
    localStorage.setItem(AuthService.CURRENT_USER, JSON.stringify(user));
  }
}
