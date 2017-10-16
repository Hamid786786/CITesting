import {NgModule} from '@angular/core';
import {CoreModule} from '@pl-core/core.module';
import {NavModule} from '../nav/nav.module';
import {CommunicationComponent} from './communication.component';
import {CommunicationRoutingModule} from './communication-routing.module';
import {AppointmentsComponent} from './appointments/appointments.component';
import {InboxDetailsComponent} from './inbox-details/inbox-details.component';
import {DataFilterPipe} from '@pl-core/_pipes/data-table-filter';
import {MdDatepickerModule} from '@angular/material';
import {MdNativeDateModule} from '@angular/material';
import {SharedModule} from '../shared/shared.module';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import {AppointmentService} from '@pl-core/_services/communication/appointment.service';

@NgModule({
  imports: [
    CoreModule,
    NavModule,
    CommunicationRoutingModule,
    MdDatepickerModule,
    MdNativeDateModule,
    SharedModule,
  ],
  declarations: [
    CommunicationComponent,
    AppointmentsComponent,
    InboxDetailsComponent,
    DataFilterPipe,
    AppointmentDetailsComponent,
  ],
  exports: [],
  providers: [AppointmentService]
})
export class CommunicationModule {}
