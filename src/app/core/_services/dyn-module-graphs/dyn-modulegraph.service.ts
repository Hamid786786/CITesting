import {Injectable} from '@angular/core';
import {CONFIG} from '@pl-core/_config';
import {ExceptionService} from '../utils/exception.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DynModulesGraphService {

  constructor(private http: HttpClient,
              private exceptionService: ExceptionService) {
  }
  // getEquipmentGraphs with the moduleId ,and page as the params
  public getEquipmentGraphs(moduleId, page) {
    return this.http
      .get(`${CONFIG.urls.equipmentGraph}?moduleId=${moduleId}&_page=${page}&_limit=2`)
      .map((response) => {
        return (response);
      })
      .share()
      .catch(this.exceptionService.catchBadResponse);
  }
}
