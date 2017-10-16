import {NgModule} from '@angular/core';
import {CoreModule} from '@pl-core/core.module';
import {DashboardGridComponent} from './dashboard-grid.component';
import {WidgetsModule} from '../widgets/widgets.module';

@NgModule({
  imports: [
    CoreModule,
    WidgetsModule
  ],
  declarations: [
    DashboardGridComponent
  ],
  exports: [
    DashboardGridComponent
  ],
  providers: []
})
export class DashboardGridModule {
}
