import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {LoadingService, TranslateService} from '@pl-core/_services';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
    constructor(
    private _loadingService: LoadingService,
    public _viewContainerRef: ViewContainerRef,
    public _translateService: TranslateService) {
    }

    public ngOnInit(): void {
      this._loadingService.show(this._translateService.instant('Loading'), this._viewContainerRef);
      setTimeout(() => { this._loadingService.hide(); } , 800);

    }
}
