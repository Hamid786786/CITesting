/**
 *  Dashboard that displays core information, including widgets.
 *
 *  Router redirects here after login and upon navigation to
 *  the App root "/" (if logged in).
 */
import {Component, OnInit, OnDestroy, AfterViewInit, HostListener, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AuthService, DashboardService, LoadingService, TranslateService, NodeDisplayService} from '@pl-core/_services';
import {DashboardGridComponent} from '@pl-modules/dashboard-grid/dashboard-grid.component';
import {MdDialog, MdSnackBar} from '@angular/material';
import {DialogComponent} from '@pl-modules/dialog/dialog.component';
import {find} from 'lodash';
import {InboxService} from '@pl-core/_services/communication/inbox.service';
import {RESOLUTION, GLOBAL} from '@pl-core/_config/constants';

@Component({
    selector: 'pl-communication',
    templateUrl: './communication.component.html',
    styleUrls: ['communication.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CommunicationComponent implements OnInit, OnDestroy, AfterViewInit {
    public isAutherized: boolean = false;
    public currentUserDetail;
    public autherizationCheck;
    public showDialog;
    public inboxList: boolean = true;
    public inboxDetails: boolean = true;
    public appList: boolean = true;
    public urlArray: any = [];
    public urlCount: any;
    private _roleChangeSub: Subscription;
    private _locationChangeSub: Subscription;

    constructor(public dialog: MdDialog,
                private _route: Router,
                private _authService: AuthService,
                private _inboxService: InboxService,
                public NodeDisplayService: NodeDisplayService,
                public _viewContainerRef: ViewContainerRef,
                public _translateService: TranslateService,
                private snackBar: MdSnackBar) {
        this.urlArray = this._route.url.split('/');
        this.urlCount = this.urlArray.length;
        if (window.screen.width < RESOLUTION.MEDIUM) {
            if (this.urlCount === 4) {
                this.inboxList = false;
                this.appList = false;
                this.inboxDetails = true;
            } else if (this.urlCount === 2 && this.urlArray[1] === 'communication') {
                this.inboxList = true;
                this.appList = false;
                this.inboxDetails = false;
            }
        } else if (window.screen.width >= RESOLUTION.MEDIUM && window.screen.width <= RESOLUTION.LARGE) {
            if (this.urlCount === 4) {
                this.inboxList = false;
                this.appList = false;
                this.inboxDetails = true;
            } else if (this.urlCount === 2 && this.urlArray[1] === 'communication') {
                this.inboxList = true;
                this.appList = true;
                this.inboxDetails = false;
            }
        } else { // Desktop
            this.inboxList = true;
            this.appList = true;
            this.inboxDetails = true;
        }

    }

    public ngOnInit() {

        this.showDialog = false;
        this.currentUserDetail = this._authService.currentUser();
        this.autherizationCheck = find(this.currentUserDetail.roles, {value: this.currentUserDetail.currentRole});
        this.isAutherized = this.autherizationCheck.isAutherized;
        this._roleChangeSub = this._authService.roleChangeEventEmitter.subscribe((newrole) => {
// Sample role change event. Subscribe like this on sub components like menu and list page etc.
            this.autherizationCheck = find(this.currentUserDetail.roles, {value: newrole});
            this.isAutherized = this.autherizationCheck.isAutherized;
            if (!this.isAutherized) {
                this.snackBar.open(this._translateService.instant('Unauthorized User'), this._translateService.instant('close'), {
                    duration: GLOBAL.constants.DURATION,
                    extraClasses: ['error']
                });
                this._route.navigate(['dashboard']);

            }
        });
        this._locationChangeSub = this._authService.locationChangeEventEmitter.subscribe((newloc) => {
            // Sample location change event. Subscribe like this on sub components like list page etc.
        });

        // Below code is used to redirect the routes based on the device resolution either to appointments/inbox screen
        if (window.screen.width <= RESOLUTION.LARGE) {
            this._route.events.subscribe((event) => {
                if (event instanceof NavigationStart) {
                    if (event.url === '/communication') {
                        if (window.screen.width >= RESOLUTION.MEDIUM && window.screen.width <= RESOLUTION.LARGE) {
                            this.inboxList = true;
                            this.appList = true;
                            this.inboxDetails = false;
                        } else if (window.screen.width < RESOLUTION.MEDIUM) {
                            if (localStorage.getItem('redirectOnMobile') === 'appointments') {
                                this.inboxList = false;
                                this.appList = true;
                                this.inboxDetails = false;
                            } else if (localStorage.getItem('redirectOnMobile') === 'inbox') {
                                this.inboxList = true;
                                this.appList = false;
                                this.inboxDetails = false;
                            }
                        }
                    }
                }
            });
            // });
        } else {// ADDED THE ELSE BLOCK CODE FOR By default 1st mail details should be shown in 3rd component(defect sheet)
            this._route.events.subscribe((event) => {
                if (event instanceof NavigationStart) {
                    if (event.url === '/communication' && window.screen.width > RESOLUTION.LARGE) {
                        this._route.navigate(['/communication/inbox/' + this._inboxService.getInboxDefault() || 1]);
                    }
                }
            });
        }
    }

    public ngAfterViewInit() {
        if (!this.isAutherized) {
            this.snackBar.open(this._translateService.instant('Unauthorized User'), this._translateService.instant('close'), {
                duration: GLOBAL.constants.DURATION,
                extraClasses: ['error']
            });
            this._route.navigate(['dashboard']);

        }
    }

    public ngOnDestroy() {
        this._roleChangeSub.unsubscribe();
        this._locationChangeSub.unsubscribe();
    }

    public getDetailInbox(data): void {
        let id = data.id;
        this._route.navigate(['/communication/inbox/' + id]);
    }

    // to check the current window size and navigate to communication inbox detail page.
    public getDetailInboxRes(data): void {
        let id = data.id;
        if (window.screen.width < RESOLUTION.MEDIUM) { // mobile
            this.inboxList = false;
            this.appList = false;
            this.inboxDetails = true;
        } else if (window.screen.width >= RESOLUTION.MEDIUM && window.screen.width <= RESOLUTION.LARGE) { // tablet
            this.inboxList = false;
            this.appList = false;
            this.inboxDetails = true;
        } else { // Desktop
            this.inboxList = true;
            this.appList = true;
            this.inboxDetails = true;
        }
        this._route.navigate(['/communication/inbox/' + id]);
    }

    // to check the current window size and navigate to communication appointment page.
    public getDetailAppointmentRes(data): void {
        let id = data.id;
        if (window.screen.width < RESOLUTION.MEDIUM) { // mobile
            this.inboxList = false;
            this.appList = false;
            this.inboxDetails = true;
        } else if (window.screen.width >= RESOLUTION.MEDIUM && window.screen.width <= RESOLUTION.LARGE) { // tablet
            this.inboxList = false;
            this.appList = false;
            this.inboxDetails = true;
        } else { // Desktop
            this.inboxList = true;
            this.appList = true;
            this.inboxDetails = true;
        }
        this._route.navigate(['/communication/appointment/' + id]);
    }

    // setting values of flags of inbox
    public showInbox() {
        this.inboxList = true;
        this.appList = false;
        this.inboxDetails = false;
    }

    // setting values of flags of calandar
    public showCalender() {
        this.inboxList = false;
        this.appList = true;
        this.inboxDetails = false;
    }

    @HostListener('window:resize', ['$event'])
    public onResize(event) {
        if (event.target.innerWidth < RESOLUTION.MEDIUM) { // mobile
            this.inboxList = true;
            this.appList = false;
            this.inboxDetails = false;
        } else if (event.target.innerWidth >= RESOLUTION.MEDIUM && event.target.innerWidth <= RESOLUTION.LARGE) { // tablet
            this.inboxList = true;
            this.appList = true;
            this.inboxDetails = false;
        } else { // Desktop
            this.inboxList = true;
            this.appList = true;
            this.inboxDetails = true;
        }
    }
}
