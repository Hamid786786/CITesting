import {Component, OnInit , ViewContainerRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AuthService,
  LoginService,
  ForgotPasswordService,
  AlertService,
  LoadingService,
  TranslateService} from '@pl-core/_services';

@Component({
  selector: 'form-change',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
  public passwordReadOnly: boolean = true;
  public logoALT: string;
  public logoURL: string;
  public userName: string;
  public userId: any;
  public userObj: any;
  public changeForm: FormGroup;
  public changeError: boolean= false;
  constructor(private _router: Router,
              private route: ActivatedRoute,
              private _loginService: LoginService,
              private _fb: FormBuilder,
              private _forgotPasswordService: ForgotPasswordService,
              private _authService: AuthService,
              private alertService: AlertService,
              private _loadingService: LoadingService,
              private _viewContainerRef: ViewContainerRef,
              public _translateService: TranslateService) {
  }

  public ngOnInit() {
    this.userName = this._forgotPasswordService.getUserName();
    this.userId = this._forgotPasswordService.getUserId();
    this.getUser(this.userId);
    this.buildForm();
  }

  public onSubmit(): void {
    if (this.changeForm.valid) {
      if (this.changeForm.value.newpassword === this.changeForm.value.repeatpassword) {
        this.userObj.password = this.changeForm.value.newpassword;
        this._authService.changePassword(this.userId, this.userObj).subscribe(
          (_resp) => {
            // console.log(_resp); // TODO check success
            this._loadingService.show(this._translateService.instant('Authenticating'), this._viewContainerRef);
            this._authService.login(this.userName, this.userObj.password)
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
        );
        // TODO sent to api
      }else {
        this.changeError = true;
        this.alertService.error(this._translateService.instant('Passwords do not match'));
      }
    } else {
      // console.log('invalid form');
    }
  }
  public getUser(id) {
   this._authService.getUserById(id)
     .subscribe(
       (_authResponse) => {
        //  console.log(_authResponse);
         this.userObj = _authResponse;
       },
       (error) => {
        //  console.log(error);
       }
     );
  }
  public disableErrorMsg() {
    this.passwordReadOnly = false;
    if (this.changeError) {
      this.changeError = false;
      this.alertService.reset();
    }
  }
  private buildForm() {
    this.changeForm = this._fb.group({
      username: [this.userName, Validators.required],
      newpassword: ['', Validators.required],
      repeatpassword: ['', Validators.required]
    });
  }
}
