import {Component} from '@angular/core';
import {FieldBaseComponent} from './field-base.component';

@Component({
  selector: 'pl-textarea-field',
  templateUrl: './field-textarea.component.html'
})

export class TextAreaFieldComponent extends FieldBaseComponent {
  constructor() {
    super();
  }
}
