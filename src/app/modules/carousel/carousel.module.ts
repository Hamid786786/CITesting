import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CoreModule} from '@pl-core/core.module';

import {CarouselComponent} from './carousel.component';

@NgModule({
  imports: [CoreModule],
  declarations: [CarouselComponent],
  exports: [CarouselComponent],
  providers: []
})

export class CarouselModule {
}
