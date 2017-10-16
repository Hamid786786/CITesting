import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import { InboxService } from '@pl-core/_services/communication/inbox.service';
import { AuthService } from '@pl-core/_services/auth/auth.service';
import { TranslateService } from '@pl-core/_services/translate/translate.service';
import {AppointmentService} from '@pl-core/_services/communication/appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class AppointmentsComponent {
  @Output() public getDetailOnClick: EventEmitter<any> = new EventEmitter<any>();
  public _appointments: any = [];
  public scrollFlag: boolean = true;
  public myDate;
  private pageCount = 1;
  private selectedDate: any;
  constructor(private _appointmentService: AppointmentService) {
    let serviceHasDate = this._appointmentService.getSelectedDate(); /*IF coming from back button in mobile , show old data*/

    if (serviceHasDate['date']) {
      this.myDate = serviceHasDate['date'];
      this._appointmentService.getAppointments(serviceHasDate['date'], 1).subscribe((_res) => {
        this._appointments = _res;
      });
    }else {
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      this.selectedDate = today; // Show Appointments for today
      /*Get Initial Appointments*/
      this._appointmentService.getAppointments(today.getTime(), 1).subscribe((_res) => {
        this._appointments = _res;
      });
    }
  }

  public onClickScroll() {
    /*Infinite Scroll Pagination Logic*/
    if (this.scrollFlag) {
    this._appointmentService.getAppointments(this.selectedDate.getTime(), (++this.pageCount)).subscribe((_res) => {
        if (_res) {
          if (_res.length > 0) {
            this._appointments.push(..._res);
            this.scrollFlag = true;
          } else {
            this.scrollFlag = false;
          }
        }
      });
    }
  }

  public selectedDateChange(date) {
  /*On Appointment date Change*/
    this._appointmentService.setSelectedDate(date.getTime());
    this.pageCount = 1;
    this.selectedDate  = date;
    this._appointmentService.getAppointments(date.getTime(), this.pageCount).subscribe((_res) => {
      this._appointments = _res;
    });
  }
  public getAppointmentDetails(appointmentId) {
    /*Show Appointment Detail*/
    let appointmentDetailObj = {
      id: appointmentId
    };
    this.getDetailOnClick.emit(appointmentDetailObj);
  }
}
