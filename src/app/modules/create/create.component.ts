import {Component, Input, OnInit, OnDestroy, ViewContainerRef} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {CreateService, LoadingService, TranslateService} from '@pl-core/_services';

import {Form} from '@pl-core/_models';
@Component({
  selector: 'pl-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  @Input() public moduleId;
  @Input() public roleId;
  @Input() public userId;

  public form: Form;
  private _createFormSub: Subscription;

  constructor(private _createService: CreateService,
              private _loadingService: LoadingService,
              public _viewContainerRef: ViewContainerRef,
              public _translateService: TranslateService) {
  }

  public ngOnInit(): void {
    this._loadingService.show(this._translateService.instant('Loading'), this._viewContainerRef);
    const options = {
      moduleId: this.moduleId,
      roleId: this.roleId,
      userId: this.userId,
      eventId: '1'
    };

    this._createFormSub = this._createService.getMetadata(options).subscribe((_iformres) => {
      setTimeout(() => { this._loadingService.hide(); } , 500);
      this.form = _iformres;
    });
  }

  public ngOnDestroy() {
    this._createFormSub.unsubscribe();
  }
}
