import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {LoginService, ForgotPasswordService, AlertService} from '@pl-core/_services';
import {ILoginRes, ICarouselSlide} from '@pl-core/_interfaces';

@Component({
  selector: 'pl-forgot-password',
  templateUrl: './forgot-password.component.html',
  providers: [LoginService]
})
export class ForgotPasswordComponent implements OnInit {

  public slides: ICarouselSlide[];
  public logoALT: string;
  public logoURL: string;
  public status: string;
  public showChangePassword: boolean = false;
  public forgotForm: FormGroup;
  public id: any;
  public forgotError: boolean = false;
  public username: string;

  constructor(private _forgotPasswordService: ForgotPasswordService,
              private _loginService: LoginService,
              private _fb: FormBuilder,
              private alertService: AlertService,
              private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['tenantId']; // (+) converts string 'id' to a number
    });
    this.buildForm();
  }
  public onSubmit(username: string): void {
    this._forgotPasswordService.checkUser(username).subscribe((_res) => {
      if (_res.status === 200) {
        this.alertService.success(_res.message);
        this.showChangePassword = true;
      }
      if (_res.status === 404) {
        this.forgotError = true;
        this.alertService.error(_res.message);
        this.showChangePassword = false;
      }
    });
  }
  public disableErrorMsg() {
    if (this.forgotError) {
      this.forgotError = false;
      this.alertService.reset();
    }
  }
  private buildForm() {
    this.forgotForm = this._fb.group({
      username: ['', Validators.required]
    });
  }

}
