import {NgModule} from '@angular/core';
import {CoreModule} from '@pl-core/core.module';

import {FieldBaseComponent} from './field-base.component';
import {TextFieldComponent} from './field-text.component';
import {TextAreaFieldComponent} from './field-textarea.component';
import {RadioFieldComponent} from './field-radio.component';
import {CheckboxFieldComponent} from './field-checkbox.component';
import {DropdownFieldComponent} from './field-dropdown.component';
import {FieldDateComponent} from './field-date.component';
import {FormGridComponent} from './form-grid.component';
import {FieldMultiSelectComponent} from './field-multiselect.component';

import {FormFieldComponent} from './form-field.component';

const FIELDS: any[] = [
  FieldBaseComponent,
  TextFieldComponent,
  TextAreaFieldComponent,
  RadioFieldComponent,
  CheckboxFieldComponent,
  DropdownFieldComponent,
  FieldDateComponent,
  FormGridComponent,
  FieldMultiSelectComponent,
  FormFieldComponent
];

@NgModule({
  imports: [CoreModule],
  declarations: [...FIELDS],
  exports: [FormFieldComponent],
  providers: []
})
export class FieldsModule {
}
