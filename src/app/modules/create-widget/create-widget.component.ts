import {Component, Input, ViewEncapsulation} from '@angular/core';
import {MdDialog} from '@angular/material';
import {DashboardDialogueComponent} from '../dashboard/dashboard-dialogue/dashboard-dialogue.component';
import {CreateWidgetService} from '@pl-core/_services';

@Component({
  selector: 'create-widget',
  templateUrl: './create-widget.component.html',
  styleUrls: ['./create-widget.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class CreateWidgetComponent {
  @Input() public src;
  constructor(public dialog: MdDialog, private _widgetService: CreateWidgetService) {
    //
  }

  // on closing of add widget pop-up
  public showDialogPopup(): void {
    let dialogRef = this.dialog.open(DashboardDialogueComponent, {disableClose: true, panelClass: 'dashbrd-modal'});
    dialogRef.afterClosed().subscribe((widgetId) => {
       if (widgetId) {
         // TODO call put widget  list api
         this._widgetService.addWidget(widgetId);
       }
    });
  }

}
