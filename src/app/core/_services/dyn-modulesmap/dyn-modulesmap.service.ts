import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CONFIG} from '@pl-core/_config';
import {ExceptionService} from '../utils/exception.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DynModulesmapService {

  constructor(private http: HttpClient,
              private exceptionService: ExceptionService) {
  }

  // getEquipmentMaps with the moduleId ,page as the params
  // RoleID if needed should be moved to interceptor

  public getEquipmentMaps(moduleId, page) {
    return this.http
      .get(`${CONFIG.urls.equipmentsMap}?moduleId=${moduleId}`)
      .map((response) => {
        return (response);
      })
      .share()
      .catch(this.exceptionService.catchBadResponse);
  }

}
