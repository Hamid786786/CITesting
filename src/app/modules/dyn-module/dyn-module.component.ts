import {Component, OnInit, ViewContainerRef, ViewEncapsulation, NgZone } from '@angular/core';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {DynModuleDailogueComponent} from './dyn-module-dailogue/dyn-module-dailogue.component';
import {MdDialog} from '@angular/material';
import {DialogComponent} from '@pl-modules/dialog/dialog.component';
import {COMPONENTKEYS} from '@pl-core/_config';
import { AuthService } from '@pl-core/_services';

import {
    GlobalService,
    NodeDisplayService,
    LoadingService,
    TranslateService,
    DynModuleService
} from '@pl-core/_services';
import {GLOBAL, CONFIG} from '@pl-core/_config';
import {Router, ActivatedRoute, NavigationStart} from '@angular/router';

@Component({
    selector: 'app-equipment',
    templateUrl: './dyn-module.component.html',
    styleUrls: ['./dyn-module.component.scss'],
    providers: [NodeDisplayService, DynModuleService],
    encapsulation: ViewEncapsulation.None
})
export class DynModuleComponent implements OnInit {
    public list: any;
    public date1: any = new Date();
    public date2: any = new Date();
    public showDialog;
    public values: any = '';
    public hideCreate: boolean = false;
    public moduleId: any;
    public filterObj = {isFilterApplied: false, filter: ''};
    public _urls = new Array();
    public _routerSubscription: any;
    public disablefilter: boolean = false;
    public filterData: any = [];
    public calendarOpened: boolean = false;
    public listFilters: any;
    public componentName: any = 'List';
    public searchUrl: string = CONFIG.urls.EquipmentSearch;
    public removing: boolean = false;
    public translatedPHText = null;
    public moduleHeader: string;
    public currentUser;
    private currentModule;
    constructor(public dialog: MdDialog,
                private _globalService: GlobalService,
                public _router: Router,
                private route: ActivatedRoute,
                public NodeDisplayService: NodeDisplayService,
                public _viewContainerRef: ViewContainerRef,
                public _translateService: TranslateService,
                public _equipmentService: DynModuleService,
                private zone: NgZone,
                public _authService: AuthService) {
        this.translatedPHText = this._translateService.instant('Search For');
    }

    public ngOnInit() {
        this.list = '';
        this.showDialog = false;
        this.currentUser = this._authService.currentUser();
        this.moduleId = +this.route.children[0].params['value']['moduleId'] || '';
        this._equipmentService.getEquipmentListFilter(this.moduleId).subscribe((filters) => {
            this.listFilters = filters;
        });
        this._urls = this._router.url.split('/');
        this.getModule(this.moduleId);
        this._routerSubscription = this._router.events.subscribe((navigationEnd) => {
            // Api call to update the module header only when the module id changed in Route
            const currentModuleId = +this.route.children[0].params['value']['moduleId'] || '';
            if (currentModuleId !== this.moduleId) {
                this.moduleId = currentModuleId;
                this.getModule(currentModuleId);
            }
            if (navigationEnd instanceof NavigationStart) {
                this._urls.length = 0;
                this.filterData = [];
                this.filterObj.filter = '';
                let routeData = navigationEnd.url.split('/');
                this._urls = routeData;
                delete this._urls[0];
                this.setHeader(this._urls[2]);

            }
        });
        this.setHeader(this._urls[2]);
    }
    public showDialogPopup(name, data): void {
        let dialogRef = this.dialog.open(DynModuleDailogueComponent, {disableClose: true, panelClass: 'equipment-modal', });
        dialogRef.componentInstance.name = name;
        dialogRef.componentInstance.data = data;
        dialogRef.componentInstance.moduleId = this.moduleId;
        dialogRef.afterClosed().subscribe((result) => {
            // TODO update as per dialogue
        });
    }

    public filterResult() {
        this.filterObj.isFilterApplied = true;
    }

    public hideFilter() {
        if (!this.calendarOpened && !this.removing) {
            this.filterObj.isFilterApplied = false;
            this.filterObj.filter = '';
        }
        this.removing = false;
        this.calendarOpened = false;
    }

    public selectedDateChange(date) {
        this.calendarOpened = true;
    }

    public redirectToCreate() {
        this._router.navigate(['/create/123']);
    }

    public redirectSearch(evntData) {
        this._router.navigate(['dyn-module-summary/' + evntData.data.moduleId + '/' + evntData.data.recordNumber]);

    }

    public removeFilter(index) {
        this.removing = true;
        if (this.filterData[index].type !== 'date') {
            let node = {
                filter: true,
                removeFilter: true
            };
            node['key'] = this.filterData[index].filterData.key;
            node['value'] = this.filterData[index].filterData.value;
            this.NodeDisplayService.addNode(node);
        }
        this.filterData.splice(index, 1);
    }

    public addFilter(filter, type) {
        let node = {
            filter: true,
            removeFilter: false
        };
        if (type !== 'date') {
            node['key'] = filter.key;
            node['value'] = filter.value;
            this.NodeDisplayService.addNode(node);
        }
        let filterInput = filter.description;
        if (filter.value && type !== 'standard' && type !== 'date') {
            filterInput = filterInput + ' : ' + filter.value;
        }
        let filterObj = {
            filterText: filterInput,
            filterType: type,
            filterData: filter
        };
        this.filterData.push(filterObj);
        this.filterObj.isFilterApplied = false;
        this.filterObj.filter = '';
    }
    private getModule(moduleId) {
        this._equipmentService.getModule(moduleId).subscribe((res) => {
            // to update the UI
            this.currentModule = res;
            this.zone.run(() => {
                setTimeout(() => {
                    this.moduleHeader = res.header[this.componentName];
                }, 0);
              });
            this._equipmentService.getStartedStatusForUser(this.currentUser.id).subscribe((response) => {
                if (response['visibility'].length) {
                    if (response['visibility'].indexOf(moduleId) === -1) {
                        // show pop up
                        console.log('show popUp', res.slides);
                        this.showDialogPopup('welcome', res.slides);
                    }
                }else {
                     // show popup
                     console.log('show popUp', res.slides);
                     this.showDialogPopup('welcome', res.slides);
                 }
            });
        },
        (err) => {
            console.log(err);
        });
    }
    private setHeader(urlValue) {
        if (urlValue === 'map') {
            this.hideCreate = false;
            this.disablefilter = true;
            this.componentName = COMPONENTKEYS.MAP;
        } else if (urlValue === 'graph') {
            this.hideCreate = false;
            this.disablefilter = true;
            this.componentName = COMPONENTKEYS.GRAPH;
        } else if (urlValue === 'list') {
            this.hideCreate = false;
            this.disablefilter = false;
            this.componentName = COMPONENTKEYS.LIST;
        }
        if (this.currentModule) {
            this.moduleHeader = this.currentModule.header[this.componentName];
        }
    }
}
