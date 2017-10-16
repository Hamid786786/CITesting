import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {Palette} from '@pl-core/_models';
import {ExceptionService} from '../utils/exception.service';
import {CONFIG} from '@pl-core/_config';

@Injectable()
export class PaletteFetcherService {

  constructor(private http: Http,
              private exceptionService: ExceptionService) {
  }

  public getApplicationPalette(): Observable<Palette> {
    return this.http
      .get(CONFIG.urls.apppalette)
      .map((response) => response.json()[0] as Palette)
      .share()
      .catch(this.exceptionService.catchBadResponse);
  }

  public getTenantPalette(tenantId: string): Observable<Palette> {
    return this.http.get(CONFIG.urls.tenantpalette,
      {search: 'tenantId=' + tenantId})
      .map((response) => response.json()[0] as Palette)
      .catch(this.exceptionService.catchBadResponse);
  }
}
