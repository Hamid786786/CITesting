import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@pl-core/_services';
import {CreateModule} from '@pl-modules/create/create.module';
import {ChangeModule} from '@pl-modules/change/change.module';
import {SummaryModule} from '@pl-modules/summary/summary.module';
import {CreateComponent} from '@pl-modules/create/create.component';
import {SummaryComponent} from '@pl-modules/summary/summary.component';
import {ChangeComponent} from '@pl-modules/change/change.component';
import {CommunicationComponent} from './communication.component';
import { NotFoundModule } from '@pl-modules/not-found/not-found.module';
import { NotFoundComponent } from '@pl-modules/not-found/not-found.component';
import {InboxDetailsComponent} from './inbox-details/inbox-details.component';
import {AppointmentDetailsComponent} from './appointment-details/appointment-details.component';

const routes: Routes = [{
  path: '',
  component: CommunicationComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: 'inbox/:inboxId',
      component: InboxDetailsComponent,
    },
    {
      path: 'appointment/:appointmentId',
      component: AppointmentDetailsComponent
    }
  ]}
  ];

@NgModule({
  declarations: [],
  imports: [
    NotFoundModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class CommunicationRoutingModule {
}
