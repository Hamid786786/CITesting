import {Injectable} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {ControlType, Tab, FieldOfTab, Form, GridSettings} from '@pl-core/_models';

@Injectable()
export class FormService {
  private controlTypes: typeof ControlType = ControlType;

  public toForm(form: Form): FormGroup {
    let group = {};
    for (let tab of form.tabs) {
      for (let field of tab.fields) {
        if ('' + field.field.controlType !== '' + this.controlTypes.Grid) {
          let defaultValue = '';
          let validations = field.isMandatory ? [Validators.required] : [];
          let fieldId = field.field.fieldId;
          let maxLength = field.field.length;
          if (maxLength != null) {
            validations.push(Validators.maxLength(maxLength));
          }
          // setting disabled property on the form control template might cause changed after checked errors
          // SET THE `disabled` property on the FormControl when instantiating it...
          // directly setting .disable on the instance after creating it or after retrieving it
          // from the formGroup will throw the error in the service
          // TypeError: Cannot set property disabled of #<AbstractControl> which has only a getter
          // if it is nessecary, use the approach suggested in the question below
          // http://stackoverflow.com/questions/40080951/angular2-enable-disable-formcontrol-on-http-response-not-working
          group[fieldId] = new FormControl({value: defaultValue, disabled: field.field.isReadOnly}, validations);
        } else {
          const gridSettings = field.field.settings as GridSettings;
          const rowCount = gridSettings.rowCount;
          let updatedGridFields = {};
          for (let rowNumber = 0; rowNumber < rowCount; rowNumber++) {
            for (let gridField of gridSettings.fields) {
              let gridValidations = gridField.isMandatory ? [Validators.required] : [];
              let maxLength = gridField.length;
              if (maxLength != null) {
                gridValidations.push(Validators.maxLength(maxLength));
              }
              let gridFieldId = gridField.fieldId;
              updatedGridFields[`${gridFieldId}:${rowNumber}`] = new FormControl({
                value: '',
                disabled: gridField.isReadOnly
              }, gridValidations);
            }
          }
          group = {
            ...group,
            ...updatedGridFields
          };
        }
      }
    }
    return new FormGroup(group);
  }
}
