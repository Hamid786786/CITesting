import {Injectable}  from '@angular/core';

import {Task}        from '@pl-core/_models';
import {TASKS}       from '@pl-modules/task-list/mock-tasks';

@Injectable()
export class TaskListService {
  public getTasks(): Promise<Task[]> {
    let tasks = Promise.resolve(TASKS);
    tasks.then((_tasks) => _tasks.forEach((task) => this.sanitiseInput(task)));
    return tasks;
  }

  public getTask(id: string): Promise<Task> {
    return this.getTasks()
      .then((tasks) => tasks.find((task) => task.taskid === id));
  }

  private sanitiseInput(task: Task): void {
    this.checkImageExists(task);
  }

  private checkImageExists(task: Task): void {
    // if path is "null", default to placeholder image
    if (task.imageurl === 'null') {
      task.imageurl = 'assets/img/default-profile-img.jpg';
    }
  }
}
