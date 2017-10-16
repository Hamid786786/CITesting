import {Injectable, ViewContainerRef} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {LoadingDialogComponent} from '@pl-modules/loading/loading-dialog.component';

@Injectable()
export class LoadingService {

  private _dialogRef: MdDialogRef<LoadingDialogComponent>;

  constructor(private dialog: MdDialog) {
  }

  // shows the loading service
  public show(loadingText: string, viewContainerRef: ViewContainerRef): Observable<boolean> {
    if (this._dialogRef) {
      this._dialogRef.close();
    }
    let config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;
    config.disableClose = true;
    this._dialogRef = this.dialog.open(LoadingDialogComponent, config);
    this._dialogRef.componentInstance.loadingText = loadingText;
    return this._dialogRef.afterClosed();
  }

  // hide the loading service

  public hide(): void {
    if (this._dialogRef) {
      this._dialogRef.close();
    }
  }
}
