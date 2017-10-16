// Module
import {NgModule} from '@angular/core';
import {CoreModule} from '@pl-core/core.module';

// Components
import {ChangeComponent} from './change.component';

@NgModule({
  imports: [CoreModule],
  declarations: [ChangeComponent],
  exports: [ChangeComponent],
  providers: []
})
export class ChangeModule {
}
