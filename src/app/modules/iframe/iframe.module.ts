import {NgModule} from '@angular/core';
import {CoreModule} from '@pl-core/core.module';
import {IframeComponent} from './iframe.component';

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    IframeComponent
  ],
  providers: [],
  exports: [
    IframeComponent
  ]
})

export class IframeModule {
}
