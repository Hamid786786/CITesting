import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrls: ['./loading-dialog.component.scss']
})
export class LoadingDialogComponent {

  public loadingText: string;

  constructor(private dialogRef: MdDialogRef<LoadingDialogComponent>) {
  }
}
