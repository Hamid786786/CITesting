import {Component} from '@angular/core';
import {FieldBaseComponent} from './field-base.component';

@Component({
  selector: 'pl-checkbox-field',
  templateUrl: './field-checkbox.component.html',
  styles: [`
    .checkbox-spacing {
      justify-content: space-between;
    }
  `]
})

export class CheckboxFieldComponent extends FieldBaseComponent {
  public value = false;

  constructor() {
    super();
  }

  private handleChange($event) {
    this.value = $event.checked;
  }
}
