/**
 *  Gateway for user authentication. Image carousel hides on small
 *  viewports like mobile phones.
 *  Router will redirect here if any guarded components are accessed
 *  without being logged in.
 */

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoginService, MetaService, AuthService} from '@pl-core/_services';
import {ILoginRes, ICarouselSlide} from '@pl-core/_interfaces';

@Component({
  selector: 'pl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  public logoALT: string;
  public logoURL: string;
  public id: any;
  public slides: any = [];

  constructor(private _loginService: LoginService,
              private _authService: AuthService,
              private _metaService: MetaService,
              private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.id = this.route.children[0].params['value']['tenantId'] || '';
    // In a real app: dispatch action to load the details here.
    this._authService.setTenantID(this.id);
    this._loginService.getResources(this.id)
      .subscribe((_res) => {
        if (_res[0]) {
          if (_res[0].slides.length >= 1) {
            this.slides = _res[0].slides;
          } else {
            this.slides = [];
          }
          this.logoURL = _res[0].logoURL;
          this.logoALT = _res[0].logoALT;
          this._metaService.setTitle(_res[0].title);
          this._metaService.setFavicon(_res[0].favicon);
        }
      });
  }
}
