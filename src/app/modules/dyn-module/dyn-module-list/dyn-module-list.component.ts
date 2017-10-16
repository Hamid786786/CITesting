import {Component, ViewChild, OnInit, OnDestroy, ViewContainerRef, ViewEncapsulation, NgZone} from '@angular/core';
import {DynModuleService, NodeDisplayService, LoadingService, TranslateService} from '@pl-core/_services';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DataSource} from '@angular/cdk';
import {MdPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {Subscription} from 'rxjs/Subscription';
import {IDynModulelist} from '@pl-core/_interfaces';
import {RESOLUTION} from '@pl-core/_config/constants';
import {orderBy, findIndex, reject} from 'lodash';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './dyn-module-list.component.html',
  styleUrls: ['./dyn-module-list.component.scss'],
  providers: [DynModuleService],
  encapsulation : ViewEncapsulation.None
})
export class DynModuleListComponent implements OnInit, OnDestroy {
  @ViewChild(MdPaginator) public paginator: MdPaginator;

  public moduleId: number;
  public equipmentList: any = [];
  public equipmentMeta: any;
  public displayedColumns = [];
  public listLoaded = false;
  public addMoreColumns = [];
  public filterParams = [];
  public sortCol = null;
  public searchData = '';
  public dataSource: ExampleDataSource | null;
  public subscription: Subscription;
  public moreColumn: string = 'moreColumn';
  public moreColWidth: string = '16%';
  public moreColAlign: string = 'center';
  public swapData;
  public accordionView;
  constructor(private _euipmentService: DynModuleService,
              private route: ActivatedRoute,
              private nodeService: NodeDisplayService,
              private _loadingService: LoadingService,
              public _viewContainerRef: ViewContainerRef,
              public _translateService: TranslateService,
              private _router: Router,
              private zone: NgZone) {

  }

  public ngOnInit() {
    if (window.screen.width < RESOLUTION.MEDIUM) {
      this.accordionView = true;
    } else {
      this.accordionView = false;
    }
    // this.accordionView = true;
    this.callInitialData();
    this.subscription = this.nodeService.node$.subscribe(
      (node) => {
          if (node && node.filter) {
            if (node.removeFilter) {
              this.filterParams = reject(this.filterParams, (filter) => {
                return (filter.key === node.key && filter.value === node.value);
              });
            } else {
              this.filterParams.push({key: node.key, value: node.value});
            }
            this._euipmentService.getEquipmentList(this.moduleId, this.searchData, this.filterParams, this.sortCol)
              .subscribe((_res1) => {
                this.equipmentList = _res1;
                this.dataSource = new ExampleDataSource(new ExampleDatabase(this.equipmentList), this.paginator);
                this._loadingService.hide();
              });
          }
      });
  }

  public callInitialData() {
    this._loadingService.show(this._translateService.instant('Loading'), this._viewContainerRef);
    this.equipmentList = [];
    this.route.params.subscribe((params: Params) => {
      this.moduleId = +params['moduleId'];
      this._euipmentService.getEquipmentMeta(this.moduleId)
        .subscribe((_res) => {
          this.listLoaded = false;
          this.equipmentMeta = orderBy(_res, ['order'], ['asc']);
          this.displayedColumns = [];
          this.addMoreColumns = [];
          for (let entry of this.equipmentMeta) {
            if (entry['flag'] === 1) {
              this.displayedColumns.push(entry['fieldId']);
            } else {
              this.addMoreColumns.push(entry);
            }
          }
          this.displayedColumns.push(this.moreColumn);
          if (!this.accordionView) {
            /**
             * for re rendering the page, fixing header drag drop issue
             */
            this.zone.run(() => {
              setTimeout(() => {
                this.listLoaded = true;
              }, 0);
            });
          }
          this._euipmentService.getEquipmentList(this.moduleId, this.searchData, this.filterParams, this.sortCol)
            .subscribe((_res1) => {
              if (_res1) {
                if (this.accordionView) {
                  console.log(_res1);
                  this.listLoaded = true;
                }
                this.equipmentList = _res1;
                this.dataSource = new ExampleDataSource(new ExampleDatabase(this.equipmentList), this.paginator);
                console.log('dataSource', this.dataSource);
                this._loadingService.hide();
              }
            });
        });
    });

  }

  public ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  public addMoreColumn(updateColumn) {
    updateColumn.flag = 1;
    this._euipmentService.updateEquipMetaData(updateColumn.id, updateColumn, this.moduleId).subscribe(
      (_resp) => {
        // TODO order is mismatching as we add to displayedcolumns
     /*   let index = _.findIndex(this.addMoreColumns, (data) => { return data.fieldId === updateColumn.fieldId; });
        this.addMoreColumns.splice(index, 1);
        this.displayedColumns.push(updateColumn.fieldId);*/
        this.callInitialData();
      });
  }

  public deleteColumn(deleteColumn, event) {
    event.stopPropagation();
    deleteColumn.flag = 0;
    this._euipmentService.updateEquipMetaData(deleteColumn.id, deleteColumn, this.moduleId).subscribe(
      (_resp) => {
        let index = findIndex(this.displayedColumns, (data) => { return data === deleteColumn.fieldId; });
        this.displayedColumns.splice(index, 1);
        this.addMoreColumns.push(deleteColumn);
      });

  }

  public moreDetail(moduleNo) {
    this._router.navigate([`/dyn-module-summary/${this.moduleId}/${moduleNo}`]);
  }

  public moreButton(moreValue) {
    // console.log(moreValue);
  }

  public sort(field) {
    if (!field.direction) {
      this.sortCol = null;
    } else {
      this.sortCol = {
        col: field.active,
        order: field.direction
      };
    }
    this._euipmentService.getEquipmentList(this.moduleId, '', this.filterParams, this.sortCol)
      .subscribe((_res1) => {
        if (_res1) {
          this.equipmentList = _res1;
          this.dataSource = new ExampleDataSource(new ExampleDatabase(this.equipmentList), this.paginator);
          this._loadingService.hide();
        }
      });
  }

  public colSwap(event) {
    if (!this.swapData) {
      this._loadingService.show(this._translateService.instant('Loading'), this._viewContainerRef);
      this.swapData = event;
      this.swapMetaColData();
    }
  }

  public processStuff(inputObject) {
    let observableBatch = [];

    inputObject.forEach((equipmentMeta) => {
      observableBatch.push(this._euipmentService.updateEquipMetaData(equipmentMeta['id'], equipmentMeta, this.moduleId));
    });

    return Observable.forkJoin(observableBatch);
  }

  private swapMetaColData() {
    // TODO move the order update logic from server WHEN ACTUAL API IS AVAILABLE
    if (this.swapData.currentOrder > this.swapData.newOrder) {
      let metaUpdateArray = [];
      let metaDatas = orderBy(this.equipmentMeta, ['order'], ['desc']);
      for (let metaData of metaDatas) {
        if (metaData['order'] === this.swapData.currentOrder) {
          metaData['order'] = this.swapData.newOrder;
          metaUpdateArray.push(metaData);
        } else if ((metaData['order'] < this.swapData.currentOrder) && (metaData['order'] >= this.swapData.newOrder)) {
          metaData['order'] = metaData['order'] + 1;
          metaUpdateArray.push(metaData);
        } else if (metaData['order'] < this.swapData.newOrder) {
          break;
        }
      }
      this.processStuff(metaUpdateArray)
        .subscribe(() => {
          this.swapData = null;
          this.callInitialData();
        });
    } else if (this.swapData.newOrder > this.swapData.currentOrder) {
      let metaUpdateArray = [];
      let metaDatas = orderBy(this.equipmentMeta, ['order'], ['asc']);
      for (let metaData of metaDatas) {
        if (metaData['order'] === this.swapData.currentOrder) {
          metaData['order'] = this.swapData.newOrder;
          metaUpdateArray.push(metaData);
        } else if (metaData['order'] > this.swapData.currentOrder && metaData['order'] <= this.swapData.newOrder) {
          metaData['order'] = metaData['order'] - 1;
          metaUpdateArray.push(metaData);
        } else if (metaData['order'] > this.swapData.newOrder) {
          break;
        }
      }
      this.processStuff(metaUpdateArray)
        .subscribe(() => {
          this.swapData = null;
          this.callInitialData();
        });
    } else {
      this.swapData = null;
      this._loadingService.hide();
    }
  }
}

export interface UserData {
  fieldId1: any;
  fieldId2: any;
  fieldId3: any;
  fieldId4: any;
}

export class ExampleDatabase {
  public dataChange: BehaviorSubject<IDynModulelist[]> = new BehaviorSubject<IDynModulelist[]>([]);

  get data(): IDynModulelist[] {
    return this.dataChange.value;
  }

  constructor(public listq) {
    this.dataChange.next(listq);
  }
}

export class ExampleDataSource extends DataSource<any> {
  constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MdPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  public connect(): Observable<IDynModulelist[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._exampleDatabase.data.slice();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  public disconnect() {
    //

  }

}
