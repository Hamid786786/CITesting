/*
 * The login form itself.
 */

import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ISelectItem} from '@pl-core/_interfaces';
import {
  LoginService,
  AuthService,
  PaletteConfiguratorService,
  PaletteFetcherService,
  TranslateService,
  LoadingService,
  AlertService
} from '@pl-core/_services';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {

  public logoALT: string;
  public logoURL: string;
  public id: any;
  public languages: ISelectItem[];
  public loginForm: FormGroup;
  public loginError: boolean = false;

  constructor(private _authService: AuthService,
              private alertService: AlertService,
              private _router: Router,
              private route: ActivatedRoute,
              private _fb: FormBuilder,
              public _translateService: TranslateService,
              private _loadingService: LoadingService,
              private _viewContainerRef: ViewContainerRef) {
  }

  public ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['tenantId'] || ''; // (+) converts string 'id' to a number
    });
    this.languages = [
      {label: 'English', value: 'en'},
      {label: this._translateService.instantWithLang('Spanish', 'es'), value: 'es'},
      {label: this._translateService.instantWithLang('Chinese Simplified', 'zh'), value: 'zh'}
    ];
    this.buildForm();
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      this._loadingService.show(this._translateService.instant('Authenticating'), this._viewContainerRef);
      this._authService.login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe(
          (_authResponse) => {
            if (_authResponse.authenticated) {
              this._loadingService.hide();
              if (this._authService.redirectUrl) {
                this._router.navigate([this._authService.redirectUrl]);
              } else {
                this._router.navigate(['/dashboard']);
              }
            } else {
              this.loginError = true;
              this.alertService.error(_authResponse.error);
              this._loadingService.hide();
            }
          },
          (error) => {
            this.alertService.error(error);
            this._loadingService.hide();
          }
        );
    }
  }

  public disableErrorMsg() {
    if (this.loginError) {
      this.loginError = false;
      this.alertService.reset();
    }
  }
  private buildForm(): void {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      language: [this.languages[0].value, Validators.required]
    });

    this.loginForm.get('language').valueChanges.subscribe((lang) => {
      this._translateService.use(lang);
    });
  }
}
