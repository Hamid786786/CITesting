import {Injectable} from '@angular/core';
import {
  Router, ActivatedRouteSnapshot, RouterStateSnapshot,
  CanActivate, CanActivateChild
} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private _authService: AuthService,
              private _router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  public checkLogin(url: string): boolean {
    if (this._authService.isAuthenticated()) {
      return true;
    }

    // Store attempted URL for redirection
    this._authService.redirectUrl = url;

    this._router.navigate(['/login/default']);
    return false;
  }

}
