import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IInbox } from '@pl-core/_interfaces';
import { CONFIG } from '@pl-core/_config';
import { ExceptionService } from '../utils/exception.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class InboxService {
  public requestId: number = 0;
  public query: any;
  public filter: any;
  public selectedAppointment: object;

  public selectedFilters: object = {
    query : null,
    filter : null,
    searchByID : null,
    searchText : null
  };
  public inboxDefault: any = null;
  constructor(
    private http: HttpClient,
    private exceptionService: ExceptionService) {
  }

  //  gets the inboxResourses with the page as the argument

  public getResources(page): Observable<IInbox[]> {
    return this.http
      .get(`${CONFIG.urls.communicationinbox}?_page=${page}&_limit=10`)
      .map((response) => {
        return (response);
      })
      .share()
      .catch(this.exceptionService.catchBadResponse);
  }

  //  sets the priority flag of the inbox with the id and selected obj as the argument

  public setPriority(id, selectedMailObj) {
    return this.http
      .put(`${CONFIG.urls.communicationinbox}/${id}`, selectedMailObj)
      .map((response) => {
        return (response);
      })
      .share()
      .catch(this.exceptionService.catchBadResponse);
  }

  //  sets the read status  flag of the inbox with the id and selected obj as the argument

  public setReadStatus(id, selectedMailObj) {
    return this.http
      .put(`${CONFIG.urls.communicationinbox}/${id}`, selectedMailObj)
      .map((response) => {
        return (response);
      })
      .share()
      .catch(this.exceptionService.catchBadResponse);
  }

  //  gets the inbox details  of the inbox with the id as the argument

  public getInboxDetails(id) {
    return this.http
      .get(`${CONFIG.urls.communicationinbox}/${id}`)
      .map((response) => {
        return (response);
      })
      .share()
      .catch(this.exceptionService.catchBadResponse);
  }

  // sets the filter date
  public setFilterDate(type, data) {
    this.selectedFilters[type] =  data;
  }

  // gets the filter date

  public getFilterDate() {
    return this.selectedFilters;
  }

  // sets  the inbox default value

  public setInboxDefault(value) {
      this.inboxDefault = value;
  }

  // gets  the inbox default value

  public getInboxDefault() {
    return this.inboxDefault;
  }

  // gets  the inbox search related data with params as query,filter ,page and id

  public getInboxSearch(query, filter, page, id) {
    let url = `${CONFIG.urls.communicationinbox}?_page=${page}&_limit=10`;
    if (query) {
      url = url + `&q=${query}` ;
    }
    if (filter) { // TODO update if priority data updates
      url = ( filter === 'priority' ) ? url + `&isPrioritySet=true` : url + `&type=${filter}`;
    }
    if (id) {
      url = url + `&id=${id}`;
    }
    return this.http
      .get(url)
      .map((response) => {
        return (response);
      })
      .share()
      .catch(this.exceptionService.catchBadResponse);
  }

  // gets  the inbox  filters

  public getInboxFilters() {
    return this.http
      .get(`${CONFIG.urls.getInboxFilters}`)
      .map((response) => {
        return (response);
      })
      .share()
      .catch(this.exceptionService.catchBadResponse);
  }

}
