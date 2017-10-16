import {Component, Input, OnInit} from '@angular/core';
import {FieldBaseComponent} from './field-base.component';
import {CustomValidators} from 'ng2-validation';

// implement a hidden input for all controls that need to be readonly
// but cannot due to implementation issues in angular2
// change the fieldId of value to fieldId:Readonly and set it to disabled
// and use a hidden input with fieldId as the property on the Formgroup

@Component({
  selector: 'pl-text-field',
  templateUrl: './field-text.component.html'
})
export class TextFieldComponent extends FieldBaseComponent implements OnInit {
  @Input() public hidden = false;
  @Input() public _value;
  public valueTypes = {
    CHAR: 'CHAR',
    NUMC: 'NUMC',
    DEC: 'DEC',
    STATUS: 'STATUS',
    EMAIL: 'EMAIL',
    DATS: 'DATS',
    DTMS: 'DTMS',
    PASS: 'PASS',
    TIMS: 'TIMS',
    ALTN: 'ALTN',
    ISCN: 'ISCN',
    REQ: 'REQ',
    TTYPE: 'TTYPE',
    VARC: 'VARC',
    UNIT: 'UNIT'
  };

  public valueType;
  public value;

  constructor() {
    super();
  }

  public ngOnInit() {
    if (this.isNumber()) {
      this.form.get(this.field.fieldId).setValidators([CustomValidators.digits]);
    }

    if (this.isDecimal()) {
      this.form.get(this.field.fieldId).setValidators([CustomValidators.number]);
    }

    if (this.isEmail()) {
      this.valueType = 'email';
      this.form.get(this.field.fieldId).setValidators([CustomValidators.email]);
    }
    if (this.isPassword()) {
      // implement any custom validations for password
      this.valueType = 'password';
    }
  }

  // acts as onBlur event
  private onChange($event) {
    this.value = $event.target.value;
  }

  private isBase() {
    return !this.field.valueType;
  }

  private isText() {
    return this.field.valueType === this.valueTypes.CHAR;
  }

  private isEmail() {
    return this.field.valueType === this.valueTypes.EMAIL;
  }

  private isPassword() {
    return this.field.valueType === this.valueTypes.PASS;
  }

  private isNumber() {
    return this.field.valueType === this.valueTypes.NUMC;
  }

  private isDecimal() {
    return this.field.valueType === this.valueTypes.DEC;
  }

  private isDate() {
    return this.field.valueType === this.valueTypes.DATS;
  }

  private isTime() {
    return this.field.valueType === this.valueTypes.TIMS;
  }

  private isDateTime() {
    return this.field.valueType === this.valueTypes.DTMS;
  }
}
