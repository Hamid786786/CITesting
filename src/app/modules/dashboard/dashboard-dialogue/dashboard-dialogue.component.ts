import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {DialogComponent} from '@pl-modules/dialog/dialog.component';
import {DashboardService} from '@pl-core/_services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard-dialogue',
  templateUrl: './dashboard-dialogue.component.html',
  styleUrls: ['./dashboard-dialogue.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class DashboardDialogueComponent implements OnInit {

  public items: any;
  public _dashItemsSub: any;
  public currentSelected: number;
  constructor(public dialogRef: MdDialogRef<DialogComponent>,
              public _dashboardService: DashboardService) {

  }
  public ngOnInit() {
    // update Content
    this._dashItemsSub = this._dashboardService.getResources(1, 3).subscribe((_idashres) => {
      this.items = _idashres;
    });

  }

  // to update currentSelected
  public selectItem(id) {
    this.currentSelected = id;
  }

  // to close dialog
  public close() {
    this.dialogRef.close(this.currentSelected);
  }
}
