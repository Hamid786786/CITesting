import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {DialogComponent} from '@pl-modules/dialog/dialog.component';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
  encapsulation : ViewEncapsulation.None
})

export class PopUpComponent implements OnInit {
  public widget: any ;
  constructor(public dialogRef: MdDialogRef<PopUpComponent>) {
  }

  public ngOnInit() {
    //
  }
  public close() {
    this.dialogRef.close();
  }

}
