import {Component, OnInit} from '@angular/core';
import {FieldBaseComponent} from './field-base.component';

@Component({
  selector: 'pl-radio-field',
  templateUrl: './field-radio.component.html',
  styles: [`
    .mat-radio-button {
      margin-right: 1rem;
    }`
  ]
})

export class RadioFieldComponent extends FieldBaseComponent implements OnInit {

  public value;

  constructor() {
    super();
  }

  public ngOnInit() {
    if (this.field.isReadOnly) {
      this.form.get(this.field.fieldId).disable();
    }
  }

  public handleChange($event) {
    this.value = $event.value;
  }
}
