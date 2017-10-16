import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { CONFIG } from '@pl-core/_config';
import { ExceptionService } from '../utils/exception.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DynModuleService {
  public apiName: any;
  public apiName2: any;
  constructor(private http: HttpClient, private exceptionService: ExceptionService) {
  }

  // getEquipmentList Meta service with moduleid as the params

  public getEquipmentMeta(moduleId) {
    if (moduleId === 1) {
      this.apiName = CONFIG.urls.equipmentMetadata;
    } else {
      this.apiName = CONFIG.urls.equipmentMetadata2;
    }
    return this.http
      .get(`${this.apiName}?moduleId=${moduleId}`)
      .map((response) => {
        return (response);
      })
      .share()
      .catch(this.exceptionService.catchBadResponse);
  }

  // getEquipmentListFilter service with moduleid  as the params

  public getEquipmentListFilter(moduleId) {
    return this.http
      .get(`${CONFIG.urls.equipmentListFilter}?moduleId=${moduleId}`)
      .map((response: Response) => {
        let filters = (response && response[0]) ? response[0] : null;
        return filters;
      });
  }

   // updateEquipMetaData service with id,metaobj and moduleId  as the params

  public updateEquipMetaData(id, metaObj, moduleId) {
    if (moduleId === 1) {
      this.apiName2 = CONFIG.urls.equipmentMetadata;
    } else {
      this.apiName2 = CONFIG.urls.equipmentMetadata2;
    }
    return this.http.put(this.apiName2 + '/' + id, metaObj)
      .map((response: Response) => {
        let updateEquipmentMeta: any = response;
        return updateEquipmentMeta;
      });
  }

  // getEquipmentList service with moduleId , filterParams and sort  as the params

  public getEquipmentList(moduleId, recordID, filterParams, sort) {
    if (moduleId === 1) {
      this.apiName2 = CONFIG.urls.equipmentList;
    } else {
      this.apiName2 = CONFIG.urls.equipmentList2;
    }
    let url = `${this.apiName2}?moduleId=${moduleId}`;
    if (sort) {
      url += `&_sort=${sort.col}&_order=${sort.order}`;
    }
    if (recordID) {
      url += `&id=${recordID}`;
    }
    if (filterParams.length > 0) {
      for (let filter of filterParams) {
        url += `&${filter.key}=${filter.value}`;
      }
    }
    return this.http
      .get(url)
      .map((response) => {
        return (response);
      })
      .share()
      .catch(this.exceptionService.catchBadResponse);
  }
  public getModule( moduleId ) {
    const url = `${CONFIG.urls.getModule}?moduleId=${moduleId}`;
    return this.http
    .get(url)
    .map((response: Response) => {
      let module = (response && response[0]) ? response[0] : null;
      return module;
    });
  }
  public getStartedStatusForUser(userId) {
    const url = `${CONFIG.urls.getStartedStatusForUser}/${userId}`;
    return this.http
    .get(url)
    .map((response: Response) => {
      return response;
    });
  }

  public putStartedStatusForUser(userId, updatedUser) {
     const url = `${CONFIG.urls.getStartedStatusForUser}/${userId}`;
     return  this.http
    .put(url, updatedUser)
      .map((response: Response) => {
        console.log('SUCCESS', response);
        return response;
      });
  }
}
