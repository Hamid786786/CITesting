import {Component, OnInit, ViewContainerRef, OnDestroy, ElementRef, ViewEncapsulation} from '@angular/core';
import {DynModulesGraphService, NodeDisplayService, LoadingService, TranslateService} from '@pl-core/_services';
import {ActivatedRoute, Params} from '@angular/router';
import {DynModuleDailogueGraphComponent} from './dyn-module-graph-dailogue/dyn-module-graph-dailogue.component';
import {MdDialog} from '@angular/material';
import { RESOLUTION } from '@pl-core/_config/constants';

@Component({
  selector: 'app-equipment-graph',
  templateUrl: './dyn-module-graph.component.html',
  styleUrls: ['./dyn-module-graph.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class DynModuleGraphComponent implements OnInit {
  public moduleId: number;
  public equipmentsGraphs: any;
  public initialPage: number = 1;
  public limitOfRecords = 1;
  public enableView: boolean = false;
  public scrollFlag: boolean = true;

  constructor(private _equipmentsGraphService: DynModulesGraphService,
              private route: ActivatedRoute,
              private _loadingService: LoadingService,
              public _viewContainerRef: ViewContainerRef,
              public _translateService: TranslateService,
              public dialog: MdDialog,
              public el: ElementRef) {

  }

  public ngOnInit() {
    this._loadingService.show(this._translateService.instant('Loading'), this._viewContainerRef);
    if (window.innerWidth >= RESOLUTION.TINY && window.innerWidth <= RESOLUTION.MEDIUM ) {
      this.limitOfRecords = 1;
    } else {
      this.limitOfRecords = 2;
    }
    this.initialGraphData();
  }

  public initialGraphData() {
    this.route.params.subscribe((params: Params) => {
      this.moduleId = +params['moduleId'];
      this._equipmentsGraphService.getEquipmentGraphs(this.moduleId, 1)
        .subscribe((_res) => {
          if (_res) {
            this.equipmentsGraphs = _res;
            console.log(_res);
            if (_res.length > 0) {
              this.enableView = true;
            } else {
              this.enableView = false;
            }
            // console.log('equipGraphs', this.equipmentsGraphs);
            setTimeout(() => { // remove setTimeout based on real apis later as the apis will load slower
              this._loadingService.hide();
            }, 200);
          }

        });
    });

  }
    public viewMore() {
        if (this.scrollFlag ) {

            this._equipmentsGraphService.getEquipmentGraphs(this.moduleId, ++this.initialPage)
            .subscribe((_res) => {
                    if (_res) {
                        if (_res.length > 0) {
                            this.equipmentsGraphs.push(..._res);
                            // console.log('equipGraphs', this.equipmentsGraphs);
                            let objDiv = document.querySelector('.graph-container');
                            objDiv.scrollTop = objDiv.scrollHeight;
                            this.scrollFlag = true;
                        } else {
                            this.scrollFlag = false;
                            this.enableView = false;
                        }
                    }
                });
        }
    }

  public selectItem(i) {
    console.log(i);
  }
   public showDialogPopupGraph(url) {
     let dialogRef = this.dialog.open(DynModuleDailogueGraphComponent, {disableClose: true, panelClass: 'equipment-modal-graph'});
    // pass properties here
     dialogRef.componentInstance.url = url;
  }

}
