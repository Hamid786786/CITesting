import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {ILoginRes} from '@pl-core/_interfaces';
import {CONFIG} from '@pl-core/_config';
import {ExceptionService} from '../utils/exception.service';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient,
              private exceptionService: ExceptionService) {
  }

  public getResources(tenantId: string): Observable<ILoginRes> {
    return this.http
      .get(CONFIG.urls.loginresources + '?tenantId=' + tenantId)
      .map((response) => {
        let logRes: any = response;
        return (logRes as ILoginRes);
      })
      .share()
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => console.log('getResources() ended'));
  }
}
