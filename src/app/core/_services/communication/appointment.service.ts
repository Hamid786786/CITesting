import { Injectable } from '@angular/core';
import { CONFIG } from '@pl-core/_config';
import {ExceptionService} from '@pl-core/_services/utils/exception.service';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class AppointmentService {

  public selectedDate: object = {
    date : null
  };
  constructor(
      private http: HttpClient,
      private exceptionService: ExceptionService) {
  }

   // sets the selected date with the particular date as the param
    public setSelectedDate(date) {
     this.selectedDate['date'] =  date;
  }

  //  gets the selected date with the particular date as the param

  public getSelectedDate() {
    return this.selectedDate;
  }

 //  gets the appointments with the particular date and page as the param
  public getAppointments(dateSelected, page) {
    return this.http
        .get(`${CONFIG.urls.appointments}?date=${dateSelected}&_page=${page}&_limit=10`)
        .map((response) => {
          return (response);
        })
        .share()
        .catch(this.exceptionService.catchBadResponse);
  }

  //  gets the appointmentsdetails with the appointmentId as the param

  public getAppointmentDetails(appointmentId) {
    return this.http
      .get(`${CONFIG.urls.appointments}/${appointmentId}`)
      .map((response) => {
        return (response);
      })
      .share()
      .catch(this.exceptionService.catchBadResponse);
  }

}
