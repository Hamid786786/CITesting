import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { IGlobal } from '@pl-core/_interfaces';
import { CONFIG } from '@pl-core/_config';
import { ExceptionService } from '../utils/exception.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GlobalService {
  public searchParams: Object = {};
  public highlighticon: any;
  constructor(private http: HttpClient,
              private exceptionService: ExceptionService) {
  }

  /*****************************************************
  *Function for getting search data
  *****************************************************/

  public getCommonSearch(urlLink, params) {
    let url = `${urlLink}?`;
    let paramsValues;
    let finalparams = params;
    Object.keys(params).forEach((key, index) => {
      if (params[key] !== '') {
         finalparams = params[key];
         paramsValues = (index === 0) ? `${key}=${finalparams}` : `&${key}=${finalparams}`;
         url += paramsValues;
      } else {
        delete params[key];
      }
    });

    return this.http
      .get(url)
      .map((response: Response) => {
        let res: any = response;
        return res;
      })
      .share()
      .catch(this.exceptionService.catchBadResponse);
  }

 /*****************************************************
  *Function for setting the search text and filter
  *****************************************************/

  public setSearchData(params) {
      this.searchParams = params;
  }

  /*****************************************************
  *Function for getting  the search text and filter
  *****************************************************/
  public getSearchData() {
    return this.searchParams;
  }

}
