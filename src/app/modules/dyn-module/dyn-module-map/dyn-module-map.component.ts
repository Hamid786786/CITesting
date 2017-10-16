import {Component, OnInit, ElementRef, ViewContainerRef, ViewEncapsulation, ViewChild} from '@angular/core';
import {DynModulesmapService, LoadingService, TranslateService} from '@pl-core/_services';
import {ActivatedRoute, Params} from '@angular/router';
import {IDynModulemaps} from '@pl-core/_interfaces';
import { RESOLUTION } from '@pl-core/_config/constants';

@Component({
  selector: 'app-equipment-map',
  templateUrl: './dyn-module-map.component.html',
  styleUrls: ['./dyn-module-map.component.scss'],
  providers: [DynModulesmapService],
  encapsulation : ViewEncapsulation.None
})
export class DynModuleMapComponent implements OnInit {
  public moduleId: number;
  public equipmentsMap: any;
  public higlightDetails: any;
  public latitude: number;
  public longitude: number;
  public initialPage: number = 1;
  public scrollFlag: boolean = true;
  public mapContainer;
  public canShowWidget: boolean;
  public mobileView: boolean;
  @ViewChild('mapWidgetContainer') private mapWidgetContainer;
  constructor(private _euipmentsmapService: DynModulesmapService,
              private route: ActivatedRoute,
              private myElement: ElementRef,
              private _loadingService: LoadingService,
              public _viewContainerRef: ViewContainerRef,
              public _translateService: TranslateService) {
    this.mapContainer = document.getElementById('container');
  }

  public ngOnInit() {
    this._loadingService.show(this._translateService.instant('Loading'), this._viewContainerRef);
    this.InitialMapData();
    if (window.innerWidth >= RESOLUTION.TINY && window.innerWidth <= RESOLUTION.MEDIUM ) {
      this.mobileView = true;
    } else {
      this.mobileView = false;
    }
    this.canShowWidget = false;
  }

  public InitialMapData() {
    this.route.params.subscribe((params: Params) => {
      this.moduleId = +params['moduleId'];
      this._euipmentsmapService.getEquipmentMaps(this.moduleId, 1)
        .subscribe((_res) => {
          if (_res) {
            this.equipmentsMap = _res;
            this.latitude = this.equipmentsMap[0].latitude;
            this.longitude = this.equipmentsMap[0].longitude;
            setTimeout(() => { // remove setTimeout based on real apis later as the apis will load slower
              this._loadingService.hide();
            }, 200);
          }
        });
    });
  }
  public openWindow(event) {
    event.open();
  }

  public closeWindow(event) {
    event.close();
  }

  public onClickScroll() {
    if (this.scrollFlag) {
      this._euipmentsmapService.getEquipmentMaps(this.moduleId, ++this.initialPage)
        .subscribe((_res) => {
          if (_res) {
            if (_res.length > 0) {
              this.equipmentsMap.push(..._res);
              this.scrollFlag = true;
            } else {
              this.scrollFlag = false;
            }
          }
        });
    }
  }

  public clickedMarker(label: string, index: number) {
    this.higlightDetails = label;
    const target = this.mapWidgetContainer.nativeElement.querySelectorAll('.map-info')[index];
    document.getElementById('custom-scroll').scrollTop = target.offsetTop;
  }

  public convertStringToNumber(value: any): number {
    return Number(value);
  }
  public showWidget() {
    this.canShowWidget = true;
  }

}
