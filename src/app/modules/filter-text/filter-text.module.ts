import {NgModule} from '@angular/core';
import {CoreModule} from '@pl-core/core.module';

import {FilterTextComponent} from './filter-text.component';

@NgModule({
  imports: [CoreModule],
  exports: [FilterTextComponent],
  declarations: [FilterTextComponent],
  providers: []
})

export class FilterTextModule {
}
