import {Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {
  public title: string;
  public body: string;
  public button: string;
  public isAutherized: boolean;

  constructor(public dialogRef: MdDialogRef<DialogComponent>,
              private _route: Router) {
  }

  public ngOnInit() {
    if (this.isAutherized === false) {
      this._route.navigate(['dashboard']);
    }
  }
}
