import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {DialogComponent} from '@pl-modules/dialog/dialog.component';

@Component({
  selector: 'app-equipment-graph-dailogue',
  templateUrl: './dyn-module-graph-dailogue.component.html',
  styleUrls: ['./dyn-module-graph-dailogue.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class DynModuleDailogueGraphComponent implements OnInit {
  public url: any ;
  constructor(public dialogRef: MdDialogRef<DynModuleDailogueGraphComponent>) {
  }

  public ngOnInit() {
    //
  }
  public close() {
    this.dialogRef.close();
  }

}
