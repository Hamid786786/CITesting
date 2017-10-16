import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ILogo, ISelectItem} from '@pl-core/_interfaces';
import {CONFIG} from '@pl-core/_config';
import {AuthService} from '../auth/auth.service';
import {LoginService} from '../login/login.service';
import {ExceptionService} from '../utils/exception.service';

@Injectable()
export class NavService {
  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private _authService: AuthService,
              private _loginService: LoginService,
              private _exceptionService: ExceptionService) {
  }

  public getLogo(): Observable<ILogo> {

    if (!this._authService.isAuthenticated) {
      return this.route.params
        .switchMap((params: Params) => this._loginService.getResources(params['tenantId']))
        .map((res) => ({
          logoURL: res.logoURL,
          logoALT: res.logoALT
        }));
    } else {
      return this.http
        .get(CONFIG.urls.loggedInLogoResource)
        .map((response) => response as ILogo)
        .share()
        .catch(this._exceptionService.catchBadResponse)
        .finally(() => '');
    }
  }

}
