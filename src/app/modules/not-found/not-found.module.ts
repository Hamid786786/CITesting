// Module
import {NgModule} from '@angular/core';
import {CoreModule} from '@pl-core/core.module';

// Components
import {NotFoundComponent} from './not-found.component';

@NgModule({
  imports: [CoreModule],
  declarations: [NotFoundComponent],
  exports: [NotFoundComponent],
  providers: []
})
export class NotFoundModule {
}
