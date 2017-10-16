import { NgModule } from '@angular/core';
import {CoreModule} from '@pl-core/core.module';
import { CommonModule } from '@angular/common';
import { TimesheetComponent } from './timesheet.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  declarations: [TimesheetComponent]
})
export class TimesheetModule { }
