import { Component, ElementRef, EventEmitter, Input, OnInit, OnChanges, Output } from '@angular/core';
import { CONFIG, GLOBAL } from '@pl-core/_config';
import { ClickOutside } from '@pl-core/_directives/click-outside';
import { GlobalService } from '@pl-core/_services';
import { AuthService } from '@pl-core/_services/auth/auth.service';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { IIconFlags } from '@pl-core/_interfaces/common-search';
import { ISearchRequestParams } from '@pl-core/_interfaces/common-search-params';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnChanges {
    public searchRes: any;
    public params: ISearchRequestParams = {
        q: '',
        type: ''
    };
    public globalSearch: any;
    public isOnBlur: boolean = false;
    public toggleSearchExpand: boolean = false;
    public highlighticon: boolean = false;
    public searchEnter: boolean = false;
    public iconFlags: IIconFlags = {
        iconClass: false,
        spanClass: false
    };

    @Input('placeHolderText') public placeHolderText: string;
    @Input('classText') public classText: string = '';
    @Input('searchUrl') public searchUrl: string;
    @Input('clearModel') public clearModel: boolean;

    @Input('iconClass') public iconClass: boolean;
    @Input('spanIcon') public spanIcon: boolean;

    // if [isFilter] is not passed from the component, default value will be FALSE
    @Input('isFilter') public isFilter: boolean = false;
    @Input('filter') public filter: string;
    @Input('onEnterEvent') public onEnterEvent: boolean;
    @Input('resetModalOnSelect') public resetModalOnSelect: boolean;

    @Output() public selectCallback: EventEmitter<any> = new EventEmitter<any>();
    @Output() public resetSearch: EventEmitter<any> = new EventEmitter<any>();
    @Output() public modalValueOnFilterChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() public iconAnimationCallback: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _globalService: GlobalService,
                public dialog: MdDialog,
                public el: ElementRef) {
    }

    public ngOnInit() {
        this.search();
    }

    public ngOnChanges() {
        this.iconFlags.iconClass = this.iconClass;
        this.iconFlags.spanClass = this.spanIcon;
        if (this.isFilter) {
            if (this.filter != null && this.filter.length > 0) {
                this.params.type = this.filter;
                this.params.q = this.globalSearch;
            }
        }

    }

    public handleBlur() {

        setTimeout(() => {
            this.highlighticon = false;
            this.searchEnter = false;
            let highlighticon = false;
            this.iconAnimationCallback.emit({ highlighticon });
        }, 200);
    }

    public handleFocus() {

        setTimeout(() => {
            this.highlighticon = true;
            this.searchEnter = true;
            let highlighticon = true;
            this.iconAnimationCallback.emit({ highlighticon });
        }, 200);

    }

    public handleDivClick($event) {
        $event.stopPropagation();
        setTimeout(() => {
            this.highlighticon = true;
            this.searchEnter = true;
            let highlighticon = true;
            this.iconAnimationCallback.emit({ highlighticon });
            this.isOnBlur = false;
        }, 210);
    }

    public search() {

        let observable = Observable.fromEvent(this.el.nativeElement, 'input');
        observable
            .debounceTime(1000)
            .distinctUntilChanged()
            .subscribe({
                next: (event: KeyboardEvent) => {
                    let inputVal = (<HTMLInputElement> event.target).value;
                    this.toggleSearchExpand = false;

                    if (inputVal.length === 0) {
                        this.isOnBlur = true;
                        this.highlighticon = true;
                        this.params.q = '';
                        this._globalService.setSearchData(this.params);
                        this.resetSearch.emit(this._globalService.getSearchData());
                    } else {
                        this.highlighticon = true;
                        this.isOnBlur = false;
                        this.params.q = inputVal;
                        this.callGlobalService(this.searchUrl, this.params);
                        this._globalService.setSearchData(this.params);
                    }

                }
            });
    }

    public handleKeyupEnter() {
        if (this.onEnterEvent && this.isFilter) {
            this.isOnBlur = true;
            if (this.filter.length > 0) {
                this.params.type = this.filter;
                if (this.globalSearch !== undefined && this.globalSearch.length > 0) {
                    this.params.q = this.globalSearch;
                }

            } else {
                this.params.type = '';
                this.params.q = this.globalSearch;
            }
        }
        this.modalValueOnFilterChange.emit(this.params);
    }

    public callGlobalService(url, params) {
        this._globalService.getCommonSearch(url, params).subscribe((_res) => {
            if (_res.length > 0) {
                this.isOnBlur = false;
            } else if (_res.length === 0) {
                this.isOnBlur = true;
            }
            this.searchRes = _res;
        });
    }

    public hide() {
        this.isOnBlur = true;
        this.highlighticon = false;
        this.searchEnter = false;
        let highlighticon = this.searchEnter;
        this.iconAnimationCallback.emit({ highlighticon });
        this.globalSearch = '';
        this.params.q = this.globalSearch;
        this._globalService.setSearchData(this.params);
    }

    public handleToggle(type, $event) {
        $event.stopPropagation();

        this.isOnBlur = false;
        this.searchEnter = false;
        for (let entry of this.searchRes) {
            if (type === entry.module) {
                entry.toggleSearchExpand = !entry.toggleSearchExpand;
                this.toggleSearchExpand = entry.toggleSearchExpand;
            }
        }
    }

    public emitSearchEvent(moduleName, data) {
        if (this.clearModel) {
            this.globalSearch = '';
        }
        this.selectCallback.emit({ moduleName, data });
        this.isOnBlur = true;
    }

    public handleIconToggle($event) {
        $event.stopPropagation();
        this.searchEnter = !this.searchEnter;

        if ((this.globalSearch === undefined || this.globalSearch == null)) {
            this.highlighticon = this.searchEnter;
        } else if (this.globalSearch !== undefined && this.globalSearch.length === 0) {
            this.highlighticon = this.searchEnter;

        } else {
            this.highlighticon = true;
        }
        let highlighticon = this.searchEnter;
        this.iconAnimationCallback.emit({ highlighticon });
    }
}
