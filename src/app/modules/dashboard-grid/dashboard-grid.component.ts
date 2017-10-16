import {Component, OnInit} from '@angular/core';
import {IDashboardItem} from '@pl-core/_interfaces';
import { DashboardService, CreateWidgetService} from '@pl-core/_services';

@Component({
  selector: 'pl-dashboard-grid',
  templateUrl: './dashboard-grid.component.html',
  styleUrls: [`dashboard-grid.component.scss`]
})
export class DashboardGridComponent implements OnInit {
  public items: any = [];

  constructor(private _widgetService: CreateWidgetService) {

    _widgetService.getWidgets$.subscribe((widgets) => {
        this.items = widgets;
      });
  }

  public ngOnInit(): void {
      this.items = this._widgetService.getWidgetsForCurrentRole();
  }
  // call-back on widget changes
  public widgetUpdateCallback(widgets) {
    this._widgetService.updateCurrentWidget(widgets);
    // this._widgetService.widgetRealigned();
  }
  // call-back on widget delete
  public deleteWidgetCallback(widget) {
    this._widgetService.deleteCurrentWidget(widget);
  }
}
