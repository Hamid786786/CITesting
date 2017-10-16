// Modules
import {NgModule} from '@angular/core';
import {CoreModule} from '@pl-core/core.module';

// Component
import {SummaryComponent} from './summary.component';

@NgModule(
  {
    imports: [CoreModule],
    declarations: [SummaryComponent],
    exports: [SummaryComponent],
    providers: []
  }
)
export class SummaryModule {
}
