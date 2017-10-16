import {Component, Input, Output, OnInit, EventEmitter, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { IGridsterOptions, IGridsterDraggableOptions } from 'angular2gridster';
import {Router} from '@angular/router';
import {MdDialog} from '@angular/material';
import {PopUpComponent} from './pop-up/pop-up.component';
import {RESOLUTION} from '@pl-core/_config/constants';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class WidgetsComponent implements OnInit {
  @Input() public widgets;
  @Output() public widgetChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public deleteWidget: EventEmitter<any> = new EventEmitter<any>();

  public screen = '';
  public data: any;
  public gridsterOptions: IGridsterOptions = {
    // core configuration is default one - for smallest view. It has hidden minWidth: 0.
    lanes: 3, // amount of lanes (cells) in the grid
    direction: 'vertical', // floating top - vertical, left - horizontal
    dragAndDrop: true, // enable/disable drag and drop for all items in grid
    resizable: true, // enable/disable resizing by drag and drop for all items in grid
    widthHeightRatio: 1, // proportion between item width and height
    shrink: true,
    responsiveView: true, // turn on adopting items sizes on window resize and enable responsiveOptions
    responsiveDebounce: 400, // window resize debounce time
    // List of different gridster configurations for different breakpoints.
    // Each breakpoint is defined by name stored in "breakpoint" property. There is fixed set of breakpoints
    // available to use with default minWidth assign to each.
    // - sm: 576 - Small devices
    // - md: 768 - Medium devices
    // - lg: 992 - Large devices
    // - xl: 1200 - Extra large
    // MinWidth for each breakpoint can be overwritten like it's visible below.
    // ResponsiveOptions can overwrite default configuration with any option available.
    responsiveOptions: [
      {
        breakpoint: 'sm',
        minWidth: RESOLUTION.TINY,
        lanes: 1
      },
      {
        breakpoint: 'md',
        minWidth: RESOLUTION.MEDIUM,
        lanes: 3
      },
      {
        breakpoint: 'lg',
        minWidth: RESOLUTION.LARGE,
        lanes: 4
      },
      {
        breakpoint: 'xl',
        minWidth: RESOLUTION.XLARGE,
        lanes: 4
      }
    ]
  };
  public gridsterDraggableOptions: IGridsterDraggableOptions = {
    handlerClass: 'panel-heading'
  };
  public itemOptions = {
    maxWidth: 4,
    maxHeight: 4
  };
  constructor(private _route: Router, public dialog: MdDialog ) {
  }
  public ngOnInit() {
    if (window.screen.width >= RESOLUTION.TINY && window.screen.width < RESOLUTION.MEDIUM) {
      this.screen = 'sm';
    } else if (window.screen.width >= RESOLUTION.MEDIUM && window.screen.width <= RESOLUTION.LARGE) {
      this.screen = 'md';
    } else if (window.screen.width > RESOLUTION.LARGE && window.screen.width < RESOLUTION.XLARGE) {
      this.screen = 'lg';
    } else if (window.screen.width >= RESOLUTION.XLARGE) {
      this.screen = 'xl';
    }else {
      this.screen = '';
    }
    const $resizeEvent = Observable.fromEvent(window, 'resize')
      .map(() => {
        return document.documentElement.clientWidth;
      })
      .debounceTime(200);

    $resizeEvent.subscribe((data) => {
      if (data >= RESOLUTION.TINY && data < RESOLUTION.MEDIUM) {
        this.screen = 'sm';
      } else if (data >= RESOLUTION.MEDIUM && data <= RESOLUTION.LARGE) {
        this.screen = 'md';
      } else if (data > RESOLUTION.LARGE && data < RESOLUTION.XLARGE) {
        this.screen = 'lg';
      } else if (data >= RESOLUTION.XLARGE) {
        this.screen = 'xl';
      } else {
        this.screen = '';
      }
    });
  }

  // function which triggers on every widget change (drag & drop and resizing)
  public itemChange($event: any) {
    if (this.screen === $event.breakpoint) {
      this.widgetChange.emit(this.widgets);
    }
  }

  // on Widget delete
  public remove(data) {
    this.deleteWidget.emit(data);
  }

  // to redirect to communication page
  public getDetailInbox(data): void {
  let id = data.id;
  this._route.navigate(['/communication/inbox/' + id]);
  }

  // to open a dialog for graph
  public showDialogPopupGraph(widget) {
    let dialogRef = this.dialog.open(PopUpComponent, {disableClose: true, panelClass: 'widgets-modal'});
    dialogRef.componentInstance.widget = widget;
    dialogRef.afterClosed().subscribe((result) => {
     // this.selectedOption = result;
   });
 }

}
