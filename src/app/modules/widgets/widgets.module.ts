import { NgModule } from '@angular/core';
import {CoreModule} from '@pl-core/core.module';
import { CommonModule } from '@angular/common';
import { WidgetsComponent } from './widgets.component';
import { GridsterModule } from 'angular2gridster';
import {CarouselModule} from '../carousel/carousel.module';
import {IframeModule} from '../iframe/iframe.module';
import {SharedModule} from '../shared/shared.module';
import {VideoModule} from '../video/video.module';
import {AudioModule} from '../audio/audio.module';
import {CreateWidgetModule} from '../create-widget/create-widget.module';
import { PopUpComponent } from './pop-up/pop-up.component';

@NgModule({
  imports: [
    CommonModule,
    GridsterModule,
    CarouselModule, IframeModule, SharedModule, VideoModule, AudioModule, CoreModule, CreateWidgetModule
  ],
  declarations: [WidgetsComponent, PopUpComponent],
  exports: [WidgetsComponent],
  entryComponents: [PopUpComponent]
})
export class WidgetsModule { }
