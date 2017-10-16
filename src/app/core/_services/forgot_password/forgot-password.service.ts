import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {IForgot} from '@pl-core/_interfaces';
import {CONFIG} from '@pl-core/_config';
import {ExceptionService} from '../utils/exception.service';

@Injectable()
export class ForgotPasswordService {
  public userName: any;
  public userId: any;

  constructor(private http: HttpClient,
              private exceptionService: ExceptionService) {
  }

  public checkUser(username: string): Observable<IForgot> {
    return this.http.get(CONFIG.urls.forgotpassword + '?username=' + username)
      .map((response: Response) => {
        let res: any = response;
        if (username === undefined || username === '') {
          return {message: ''};
        }
        if (res.length === 0) {
          return {status: 404, message: 'Invalid User'};
        }else if (res[0] && (res[0].username === username && res[0].status === 200)) {
          this.setUser(username, res[0].id);
          return {status: 200, message: 'Link Sent!!! Check your Email.'};
        }else if (res[0] && (res[0].username !== username || res[0].status === 404)) {
          return {status: 404, message: 'Invalid User'};
        }
      })
      .share()
      .catch(this.exceptionService.catchBadResponse);
  }

  public getUserName() {
    return this.userName;
  }
  public getUserId() {
  return this.userId;
  }
  public setUser(userName, id) {
    this.userName = userName;
    this.userId = id;
  }
}
