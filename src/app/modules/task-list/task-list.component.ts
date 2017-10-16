/**
 *  Displays list of tasks
 *  Supports sorting on columns and filtering results
 *
 *  ISSUES:
 *  - Date sorting/filtering needs work
 *  - Tasks need to be retrieved from server instead of mock data
 *  - Break down into TaskListItem components for further abstraction?
 */

import {
  Component, OnInit, OnDestroy,
  ViewChild
} from '@angular/core';

import {Task} from './task';
import {TaskListService, FilterTextService, SorterService} from '@pl-core/_services';

import {Observable} from 'rxjs/Observable';
import '../rxjs-operators';

// import { FilterTextComponent } from '../shared/filter-text/filter-text.component';
import {ModalComponent} from '../shared/modal/modal.component';

@Component({
  selector: 'pl-task-list',
  templateUrl: './task-list.component.html',
  providers: [SorterService]
})

export class TaskListComponent implements OnInit {
  public tasks: Task[];
  public filteredTasks: Task[];

  public showModal = false;

  // Controls display of ascending/descending arrow on columns
  public sortProperty: string = null;
  public sortReversed: boolean = false;

  // @ViewChild(FilterTextComponent)
  // private filterComponent: FilterTextComponent;

  // Displayed column headers (in the view) and their corresponding
  // properties retrieved from backend
  public columns = [
    {displayName: 'Sender', property: 'fname'},
    {displayName: 'Request Detail', property: 'objectid'},
    {displayName: 'Received On', property: 'datestarted'},
    {displayName: 'Due Date', property: 'duedate'},
    {displayName: 'Requester', property: 'requestorName'},
    {displayName: 'Requested Date', property: 'requestorDate'},
    {displayName: 'Event', property: 'eventId'}
  ];

  constructor(private taskListService: TaskListService,
              private sorterService: SorterService,
              private filterService: FilterTextService) {
  }

  public ngOnInit(): void {
    this.getTasks();
    this.initFilterComponent();
  }

  public initFilterComponent(): void {
    // May need to unsubscribe from filterObs
    let filterProps = ['fname', 'objectid'];

    /*  Old broken code: For some reason chaining toArray directly after
     switchMap doesn't work, so must resort to a two-step conversion using
     Observable.from, followed by toArray (as below)

     .switchMap(query => this.filterService.filter(query.filterProps, this.task))
     .toArray()
     .subscribe(filtered => this.filteredTasks = filtered); */

    /*  FilterService's filter() produces a Task[] array, but each item is emitted
     separately. This means that in order to assign the filtered results array
     directly to this.filteredTasks (in the subsequent subscription), the
     returned Observable in switchMap must be cast to an "array-like"
     Observable (via toArray) that emits a single value of "array" type. */
    this.filterService.filterObs
      .debounce((ev) => Observable.interval(500))
      .switchMap((query) => {
        let results = this.filterService.filter(query, filterProps, this.tasks);
        return Observable.from(results).toArray();
      })
      .subscribe((filtered) => {
        this.filteredTasks = filtered;
        this.sorterService.sort(this.filteredTasks, this.sortProperty, false);
      });

    // this.filterComponent.clear();
  }

  public getTasks(): void {
    this.taskListService.getTasks()
      .then((tasks) => {
        this.tasks = this.filteredTasks = tasks;
      });
  }

  // Called when column headers are clicked
  public sortBy(prop: string): void {
    this.sorterService.sort(this.filteredTasks, prop);

    this.sortProperty = prop;
    this.sortReversed = this.sorterService.isReversed();
  }
}
