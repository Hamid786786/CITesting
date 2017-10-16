import { Injectable, EventEmitter, Output} from '@angular/core';
import { CONFIG ,  GLOBAL} from '@pl-core/_config';
import { ExceptionService } from '../utils/exception.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GlobalCreateService {

  constructor(
    private http: HttpClient,
    private exceptionService: ExceptionService) {
  }

   public getModuleData(module, moduleId) {

    let id;
    if (module === 'dashboard') {
      id = GLOBAL.constants.DASHBOARD;

    } else if (module === 'communication') {
      id = GLOBAL.constants.COMMUNICATION;

    } else if (module === 'module') {
      id = GLOBAL.constants.MODULES;
    } else {
      id = null;
    }
    if (id === '3') {
      return this.http
      .get(`${CONFIG.urls.equipmentCreateData}?module_id=${moduleId}&roleId=12&token=${JSON.parse(localStorage.getItem('currentUser')).token}`)
      .map((response) => {
        return (response);
      })
      .share()
      .catch(this.exceptionService.catchBadResponse);

    } else {
      if (id !== null) {
      return this.http
      .get(`${CONFIG.urls.getGlobalCreateData}/${id}`)
      .map((response) => {
        return (response);
      })
      .share()
      .catch(this.exceptionService.catchBadResponse);
     }else {
    //   return ;
     }
    }

  }

}
