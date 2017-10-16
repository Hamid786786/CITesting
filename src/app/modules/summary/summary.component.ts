import { Component, Input, ViewContainerRef, OnInit } from '@angular/core';
import { LoadingService, TranslateService } from '@pl-core/_services';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

@Component({
  selector: 'pl-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  @Input() public moduleId;
  @Input() public moduleNumber;
  @Input() public roleId;
  @Input() public userId;
  public _routerSubscription: any;

  constructor(
    private _loadingService: LoadingService,
    public _viewContainerRef: ViewContainerRef,
    public _translateService: TranslateService,
    public _router: Router,
  ) {
  }

  public ngOnInit() {
    this._loadingService.show(this._translateService.instant('Loading'), this._viewContainerRef);
    setTimeout(() => { this._loadingService.hide(); }, 800);
  }

}
