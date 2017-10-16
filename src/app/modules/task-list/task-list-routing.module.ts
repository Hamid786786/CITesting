import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TaskListComponent} from './task-list.component';

const routes: Routes = [
  {
    path: 'task-list',
    component: TaskListComponent,
    data: {
      title: 'Task List'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TaskListRoutingModule {
}
