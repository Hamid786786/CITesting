/**
 *  Extends ng2-bootstrap Datepicker component.
 *  See: http://valor-software.com/ng2-bootstrap/#/datepicker
 *
 *  ISSUES:
 *  - Timezone trickiness (JS built-in Date is flawed)
 *  - May need to move ng2-bootstrap from dev dependencies to
 *    main dependencies.. need to check in production
 */

// maxDate and minDate validations are not supported
// by browsers, instead implement custom validation directive, to start
// with just use the ng2-validation module for simple validators

import {Component, Input, OnInit} from '@angular/core';
import {FieldBaseComponent} from './field-base.component';
import {CustomValidators} from 'ng2-validation';

@Component({
  selector: 'pl-date-field',
  templateUrl: './field-date.component.html'
})
export class FieldDateComponent implements OnInit {
  @Input() public form;
  @Input() public field;

  public value: Date;
  public isVisible: boolean = false;

  public valueStr: string;
  public financialStartMonth = 7;

  public ngOnInit() {
    if (this.field.settings.setDefaultDate) {
      this.form.get(this.field.fieldId).setValue(new Date());
    } else if (this.field.settings.pastDate) {
      // add validators after a form control has been defined
      // http://stackoverflow.com/questions/38797414/angular2-how-to-add-validator-to-formcontrol-after-control-is-created
      this.form.get(this.field.fieldId).setValidators([
        CustomValidators.maxDate(new Date())
      ]);
    } else if (this.field.settings.futureDate) {
      this.form.get(this.field.fieldId).setValidators([
        CustomValidators.minDate(new Date())
      ]);
    } else if (this.field.settings.financialStartDate) {
      this.form.get(this.field.fieldId).setValidators([
        CustomValidators.minDate(
          this.getFinancialStartDate(this.financialStartMonth)
        )
      ]);
    } else if (this.field.settings.financialEndDate) {
      this.form.get(this.field.fieldId).setValidators([
        CustomValidators.maxDate(
          this.getFinancialEndDate(this.financialStartMonth)
        )
      ]);
    } else if (this.field.settings.withinFinancialYear) {
      this.form.get(this.field.fieldId).setValidators([
        CustomValidators.minDate(
          this.getFinancialStartDate(this.financialStartMonth)
        ),
        CustomValidators.maxDate(
          this.getFinancialEndDate(this.financialStartMonth)
        )
      ]);
    }
  }

  public getDateAsEpoch(): number {
    return this.value && this.value.getTime() || this.today().getTime();
  }

  public toDateString(date: Date): string {
    return (date.getFullYear().toString() + '-'
      + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
      + ('0' + (date.getDate())).slice(-2))
      + 'T' + date.toTimeString().slice(0, 5);
  }

  public getCurrentFinancialYear(month: number): number {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const financialYear = currentMonth < month ? currentYear - 1 : currentYear;
    return financialYear;
  }

  public getFinancialStartDate(month: number): Date {
    const financialYear = this.getCurrentFinancialYear(month);
    return new Date(1, month - 1, financialYear);
  }

  public getFinancialEndDate(month: number): Date {
    const financialYear = this.getCurrentFinancialYear(month);
    return new Date(31, month - 2, financialYear);
  }

  public today(): Date {
    return new Date();
  }

  public onTitleClick(): void {
    this.isVisible = !this.isVisible;
  }

  public hide(): void {
    this.isVisible = false;
  }

  public onDateChange($event) {
    this.valueStr = $event.target.value();
  }
}
