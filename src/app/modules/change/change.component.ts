import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {LoadingService, TranslateService} from '@pl-core/_services';

@Component({
  selector: 'pl-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {
  @Input() public moduleId;
  @Input() public moduleNumber;
  @Input() public roleId;
  @Input() public userId;

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
