import {NgModule} from '@angular/core';
import {CoreModule} from '@pl-core/core.module';
import {NavModule} from '../nav/nav.module';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {SharedModule} from '../shared/shared.module';
import {DashboardDialogueComponent} from './dashboard-dialogue/dashboard-dialogue.component';
import {CarouselModule} from '../carousel/carousel.module';
import {IframeModule} from '../iframe/iframe.module';
import {VideoModule} from '../video/video.module';
import {AudioModule} from '../audio/audio.module';
import {WidgetsModule} from '../widgets/widgets.module';
import {CreateWidgetModule} from '../create-widget/create-widget.module';

@NgModule({
  imports: [
    CoreModule,
    NavModule,
    DashboardRoutingModule,
    SharedModule,
    CarouselModule,
    IframeModule,
    VideoModule,
    AudioModule,
    WidgetsModule,
    CreateWidgetModule
  ],
  declarations: [
    DashboardComponent,
    DashboardDialogueComponent
  ],

  exports: [],
  providers: []
})

export class DashboardModule {
}
