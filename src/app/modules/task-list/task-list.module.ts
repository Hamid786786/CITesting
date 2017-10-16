import {NgModule} from '@angular/core';
import {CoreModule} from '@pl-core/core.module';
import {TaskListRoutingModule} from './task-list-routing.module';

import {TaskListComponent} from './task-list.component';

@NgModule({
  imports: [CoreModule, TaskListRoutingModule],
  declarations: [TaskListComponent],
  providers: []
})

export class TaskListModule {
}
