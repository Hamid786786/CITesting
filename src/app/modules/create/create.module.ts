// Modules
import {NgModule} from '@angular/core';
import {CoreModule} from '@pl-core/core.module';
import {DynamicFormModule} from '@pl-modules/dynamic-form/dynamic-form.module';
import {SharedModule} from '../shared/shared.module';
// Components
import {CreateComponent} from './create.component';

@NgModule(
  {
    imports: [CoreModule, DynamicFormModule, SharedModule],
    declarations: [CreateComponent],
    exports: [CreateComponent],
    providers: []
  }
)
export class CreateModule {
}
