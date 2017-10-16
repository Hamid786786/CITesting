import {Component} from '@angular/core';
import {FieldBaseComponent} from './field-base.component';

@Component({
  selector: 'pl-dropdown-field',
  templateUrl: './field-dropdown.component.html'
})

export class DropdownFieldComponent extends FieldBaseComponent {
  public helpOption;

  constructor() {
    super();
  }

  // public ngOnInit () {
  //   this.helpOption = { label: this.field.helpText, value: '' };
  //  }
}
