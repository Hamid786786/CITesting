import {Component, OnInit} from '@angular/core';
import {AppointmentService} from '@pl-core/_services/communication/appointment.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss'],
  providers: [AppointmentService]
})
export class AppointmentDetailsComponent implements OnInit {
  public appointmentId: number;
  public appointmentDetails: object= {};

  constructor(private _appointmentService: AppointmentService, private route: ActivatedRoute) {
    localStorage.setItem('redirectOnMobile', 'appointments');
  }
  public ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = +params['appointmentId']; // (+) converts string 'id' to a number
      this._appointmentService.getAppointmentDetails(this.appointmentId)
        .subscribe((_res) => {
        this.appointmentDetails = _res;
      });
    });
  }
}
