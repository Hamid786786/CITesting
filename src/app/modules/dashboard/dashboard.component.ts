/**
 *  Dashboard that displays core information, including widgets.
 *
 *  Router redirects here after login and upon navigation to
 *  the App root "/" (if logged in).
 */

import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AuthService, DashboardService} from '@pl-core/_services';
import {MdDialog} from '@angular/material';
import {DialogComponent} from '@pl-modules/dialog/dialog.component';
import {DashboardGridComponent} from '@pl-modules/dashboard-grid/dashboard-grid.component';
import {find} from 'lodash';

@Component({
  selector: 'pl-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  encapsulation : ViewEncapsulation.None
})

export class DashboardComponent implements OnInit, OnDestroy {
  public isAutherized: boolean = false;
  public currentUserDetail;
  public autherizationCheck;
  public showDialog;
  public widgets;
  private _roleChangeSub: Subscription;
  private _locationChangeSub: Subscription;
  constructor(private _route: Router,
              private _authService: AuthService,
              public dialog: MdDialog,
            ) {
  }

  public ngOnInit() {
    this.showDialog = false;
    this.currentUserDetail = this._authService.currentUser();
    this.autherizationCheck = find(this.currentUserDetail.roles, { value : this.currentUserDetail.currentRole});
    this.isAutherized = this.autherizationCheck.isAutherized;
    this._roleChangeSub = this._authService.roleChangeEventEmitter.subscribe((newrole) => {
      // Sample role change event. Subscribe like this on sub components like menu and list page etc.
      this.autherizationCheck = find(this.currentUserDetail.roles, {value: newrole});
      this.isAutherized = this.autherizationCheck.isAutherized;

    });
    this._locationChangeSub = this._authService.locationChangeEventEmitter.subscribe((newloc) => {
      // Sample location change event. Subscribe like this on sub components like list page etc.
    });
  }

  public ngOnDestroy() {
    this._roleChangeSub.unsubscribe();
    this._locationChangeSub.unsubscribe();
  }

  // to naviagate to communication page
  public getDetailInbox(data): void {
    let id = data.id;
    this._route.navigate(['/communication/inbox/' + id]);
  }
}
