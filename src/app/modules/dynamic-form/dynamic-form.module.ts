import {NgModule} from '@angular/core';

import {CoreModule} from '@pl-core/core.module';
import {ModalModule} from '@pl-modules/modal/modal.module';
import {FieldsModule} from './fields/fields.module';

import {FormTabComponent} from './form-tab.component';
import {FormComponent} from './form.component';

@NgModule({
  imports: [
    CoreModule,
    FieldsModule,
    ModalModule
  ],
  declarations: [
    // Declare DFTabComponent since it needs access to DFFormModule and
    // DFGridModule to make its ng-content selectors work.
    FormTabComponent,
    FormComponent
  ],
  exports: [
    FormComponent,
  ],
  providers: []
})

export class DynamicFormModule {
}
