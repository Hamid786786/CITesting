import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {IDashboardRes} from '@pl-core/_interfaces';
import {CONFIG} from '@pl-core/_config';
import {ExceptionService} from '../utils/exception.service';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient,
              private exceptionService: ExceptionService) {
  }

  // function to get the dashboard resource with page and totalcount as the params
  public getResources(page, totalCount): Observable<IDashboardRes> {
    let url = CONFIG.urls.dashboardresources;
    if (page && totalCount) {
      url = url + `?_page=${page}&_limit=${totalCount}`;
    }
    return this.http
      .get(url)
      .map((response) => {
        return response as IDashboardRes;
      })
      .catch(this.exceptionService.catchBadResponse);
  }
}
