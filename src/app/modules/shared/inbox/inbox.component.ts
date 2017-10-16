import {
  Component,
  OnInit,
  OnDestroy,
  ViewContainerRef,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef,
  NgZone,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { InboxService, MetaService, GlobalService, LoadingService, TranslateService, NodeDisplayService } from '@pl-core/_services';
import { IInbox } from '@pl-core/_interfaces';
import { DialogComponent } from '@pl-modules/dialog/dialog.component';
import { MdDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL, CONFIG } from '@pl-core/_config';
import {RESOLUTION} from '@pl-core/_config/constants';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class InboxComponent implements OnInit, OnDestroy {

  @Output() public getDetail: EventEmitter<any> = new EventEmitter<any>();
  @Output() public getDetailOnClick: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('inboxsearch') public inboxsearch;
  public filterQuery: string = '';
  public isSearched: boolean = false;
  public searchQuery: any;
  public searchId: string = '';
  public selectedFilter: any = '';
  public showFilterDropdown: boolean = false;
  public getFilterList: any;
  public extendFilters: boolean = false;
  public displaySelectedFilter: any;
  public priorityFlag: boolean = false;
  public myElement: ElementRef;
  public scrollFlag: boolean = true;
  public searchUrl: string = CONFIG.urls.inboxSearch;
  public translatedPHText = null;

  public autoSuggest: object = {
    resultArray: null,
    resultArrayKeys: null,
    noSuggestions: false,
    flag: false
  };

  public prioritySubscription: Subscription;
  public priorityFlagSubscription: any;
  public inboxContent: IInbox[] = [];
  private _inboxResSub: Subscription;
  private _getFilterSub: Subscription;
  private _inboxCount = 1;
  private _getSearchSub;

  constructor(public _translateService: TranslateService,
              public _viewContainerRef: ViewContainerRef,
              public NodeDisplayService: NodeDisplayService,
              public dialog: MdDialog,
              public zone: NgZone,
              public myElementRef: ElementRef,
              private _route: ActivatedRoute,
              private _inboxService: InboxService,
              private _globalService: GlobalService,
              private _loadingService: LoadingService) {
    this.myElement = myElementRef;
    this.translatedPHText = this._translateService.instant('Search');
  }

  public ngOnInit() {
    this._loadingService.show(this._translateService.instant('Loading'), this._viewContainerRef);
    this._getFilterSub = this._inboxService.getInboxFilters().subscribe((_res) => {
      this.getFilterList = _res;
    });
    this.initialInboxData();
    this.setPriorityFlag();
  }

  public redirectSearch(evnData) {
    this.searchInbox(evnData.data.recordNumber, true);

  }

  public setPriorityFlag() {
    this.prioritySubscription = this.NodeDisplayService.node$.subscribe((node) => {
      if (node !== undefined) {
        this.priorityFlagSubscription = node;
        if (node.isPrioritySet) {
          this.myElement.nativeElement.querySelector('.inbox-' + node.id).style.color = 'red';
        } else {
          this.myElement.nativeElement.querySelector('.inbox-' + node.id).style.color = 'grey';
        }
      }
    });
  }

  public initialInboxData() {

    let filters = this._inboxService.getFilterDate();
    if (filters['filter'] || filters['query'] && filters['searchByID'] == null && filters['searchText'] == null) {
      this.loadPreviousSelected();
      return;
    } else if (filters['searchText'] && filters['searchByID']) {
      this.selectedFilter = this.displaySelectedFilter = filters['filter'];
      this.filterQuery = filters['query'];
      this.searchInbox(filters['searchText'], filters['searchByID']);
    } else {
      this._inboxResSub = this._inboxService.getResources(1).subscribe((_res) => {
        if (_res) {

          this._inboxService.setInboxDefault(_res[0].id);

          this.inboxContent = _res;
          let inboxId;
          let appointmentId;

          if (this._route && this._route.children[0] && this._route.children[0].params['value']['inboxId']) {
            inboxId = this._route.children[0].params['value']['inboxId'];
          } else if (this._route && this._route.children[0] && this._route.children[0].params['value']['appointmentId']) {
            appointmentId = this._route.children[0].params['value']['appointmentId'];
          }
          if (!inboxId && !appointmentId) {
            this.emitInboxDetails(_res[0].id);
          }
          this._loadingService.hide();
        }

      });
    }

  }

  public emitInboxDetails(id) {
    if (window.screen.width > RESOLUTION.LARGE) {// desktop then call details
      this.getDetail.emit({ id });
    }
  }

  public loadPreviousSelected() {
    let filters = this._inboxService.getFilterDate();
    if (filters['filter'] || filters['query']) {
      this.selectedFilter = this.displaySelectedFilter = filters['filter'];
      this.filterQuery = filters['query'];
      this._getSearchSub = this._inboxService.getInboxSearch(this.filterQuery, this.selectedFilter(this.selectedFilter === 'none') ? '' : this.selectedFilter, 1, this.searchId).subscribe((_res) => {
        this.inboxSearchFilterApiHit(_res, this.selectedFilter, this.filterQuery);
        this._loadingService.hide();
      });
    }
  }

  public inboxSearchFilterApiHit(_res, filter, searchQuery) {
    // This is to destroy the container and reinitialize,
    if (_res.length === 0) {
      this.inboxContent = [];
      this.isSearched = false;
    }
    if ((searchQuery != null && searchQuery.length > 0 && _res.length > 0) || (filter != null && _res.length > 0)) {
      this.inboxContent = _res;
      this.isSearched = true;
      this.emitInboxDetails(_res[0].id);

    } else if ((searchQuery && searchQuery.length === 0) || (filter != null && _res.length > 0)) {
      this._inboxResSub = this._inboxService.getResources(1).subscribe((_result) => {
        this._loadingService.hide();
        if (_result) {
          this.inboxContent = _result;
          this.isSearched = false;
          this.emitInboxDetails(_result[0].id);
        }
      });
    } else if ((searchQuery == null && filter == null)) {
      this._inboxResSub = this._inboxService.getResources(1).subscribe((_result) => {
        this.inboxContent = _result;
        this._loadingService.hide();
        this.isSearched = false;
        this.emitInboxDetails(_result[0].id);
      });
    } else {
      this._loadingService.hide();
    }
  }

  public searchInbox(searchText, searchByID) {
    this.autoSuggest['flag'] = false;
    this._inboxService.setFilterDate('searchByID', searchByID);
    this._inboxService.setFilterDate('searchText', searchText);
    if (searchByID) {
      this.searchId = searchText;
      this.searchQuery = '';
      this._getSearchSub = this._inboxService.getInboxDetails(searchText).subscribe((_res) => {
        let searchResult = [];
        searchResult.push(_res);
        this._loadingService.hide();
        this.inboxSearchFilterApiHit(searchResult, this.selectedFilter, _res.contentBody);
      });
    } else {
      this.searchId = '';
      this.searchQuery = searchText;
      this._inboxCount = 1;
      this._getSearchSub = this._inboxService.getInboxSearch(this.searchQuery, this.selectedFilter, 1, this.searchId).subscribe((_res) => {
        this.inboxSearchFilterApiHit(_res, this.selectedFilter, this.searchQuery);
      });
    }
  }

  public modalValueOnFilterChange(evntdata) {
    this.searchQuery = evntdata.q;
    this.selectedFilter = evntdata.type;
    this.searchInbox(this.searchQuery, false);
  }

  public resetSearch(evntdata) {
    this._inboxCount = 1;
    this._getSearchSub = this._inboxService.getInboxSearch(evntdata['q'], this.selectedFilter, 1, '').subscribe((_res) => {
      this.inboxSearchFilterApiHit(_res, this.selectedFilter, evntdata['q']);
    });

  }

  public onClickScroll() {
    if (!this.isSearched) {
      if (this.scrollFlag) {
        this._inboxResSub = this._inboxService.getResources(++this._inboxCount).subscribe((_res) => {
          if (_res) {
            if (_res.length > 0) {
              this.inboxContent.push(..._res);
              this.scrollFlag = true;
            } else {
              this.scrollFlag = false;
            }
          }
        });
      }
    } else {
      this.scrollFlag = true;
      if (this.scrollFlag) {
        this._getSearchSub = this._inboxService.getInboxSearch(this.searchQuery, this.selectedFilter, ++this._inboxCount, this.searchId).subscribe((_res) => {
          if (_res) {
            if (_res.length > 0) {
              this.inboxContent.push(..._res);
              this.scrollFlag = true;
            } else {
              this.scrollFlag = false;
            }
          }
        });
      }
    }
  }

  public showDetails(mailid, mailitem) {

    this.getDetailOnClick.emit({
      id: mailid
    });
    if (!mailitem.isRead) {
      mailitem.isRead = !mailitem.isRead;
    }

    this._inboxResSub = this._inboxService.setReadStatus(mailid, mailitem).subscribe((_res) => {
      //  console.log(_res);
    });

  }

  public selectFilter(selectedFilterParams, event) {
    if (event !== undefined || event !== null) {
      event.stopPropagation();
    }
    let searchData = this._globalService.getSearchData();
    this.searchQuery = searchData['q'];

    if (selectedFilterParams === 'tasks') {
      this.extendFilters = !this.extendFilters;
    } else {
      if (selectedFilterParams === 'none') {
        this.displaySelectedFilter = '';
        this.selectedFilter = '';
        this._inboxService.setFilterDate('filter', '');
      } else {
        this.displaySelectedFilter = selectedFilterParams;
        this.selectedFilter = selectedFilterParams;
      }
      this.showFilterDropdown = !this.showFilterDropdown;
      this.searchId = '';
      this._inboxCount = 1;
      this._getSearchSub = this._inboxService.getInboxSearch(this.searchQuery, this.selectedFilter, 1, '').subscribe((_res) => {
        this.inboxSearchFilterApiHit(_res, this.selectedFilter, this.searchQuery);
      });
    }
  }

  public setPriority(id, item) {
    this.priorityFlag = item.isPrioritySet;
    let mailItem = item;
    mailItem.isPrioritySet = !this.priorityFlag;
    this._inboxResSub = this._inboxService.setPriority(id, mailItem).subscribe((_res) => {
      this.NodeDisplayService.addNode(_res);
      if (_res.isPrioritySet) {
        this.myElement.nativeElement.querySelector('.inbox-' + id).style.color = '#e9000';
      } else {
        this.myElement.nativeElement.querySelector('.inbox-' + id).style.color = 'grey';
      }
    });
  }

  public ngOnDestroy() {
    this._inboxResSub.unsubscribe();
    this.prioritySubscription.unsubscribe();
  }

}
