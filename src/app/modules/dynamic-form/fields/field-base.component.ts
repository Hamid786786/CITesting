import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Field} from '@pl-core/_models';

@Component({
  selector: 'pl-field',
  template: ''
})
export class FieldBaseComponent {
  @Input() public field: Field;
  @Input() public form: FormGroup;
}
