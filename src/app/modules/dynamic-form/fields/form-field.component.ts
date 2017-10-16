import {Component, Input} from '@angular/core';
import {ControlType} from '@pl-core/_models';
import {FieldBaseComponent} from './field-base.component';

@Component({
  selector: 'pl-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: [`./form-field.component.scss`]
})
export class FormFieldComponent extends FieldBaseComponent {
  public controlTypes: typeof ControlType = ControlType;
}
