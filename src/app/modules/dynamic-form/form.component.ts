/**
 *  A dynamically generated form composed of a series of individual
 *  tabs, each housing a collection of fields (DFFormComp), or a
 *  grid (DFGridComp).
 *
 *  Tabs are transparent containers for the form and grid views,
 *  DynamicFormComponent is the main controller
 */

import {Component, Input} from '@angular/core';
import {Form, ControlType, GridSettings} from '@pl-core/_models';

@Component({
  selector: 'pl-form',
  templateUrl: './form.component.html',
  styles: [`
    .container {
      margin-right: auto;
      margin-left: auto;
    }

    pl-form-field {
      margin-bottom: 1rem;
    }

    @media only screen and (min-width: 48em) {
      .container {
        width: calc(48em + 1rem);
      }
    }

    @media only screen and (min-width: 64em) {
      .container {
        width: calc(64em + 1rem);
      }

      @media only screen and (min-width: 75em) {
        .container {
          width: calc(75em + 1rem);
        }
      }
  `]
})
export class FormComponent {
  @Input() public form: Form;
  public controlTypes: typeof ControlType = ControlType;

  public onSubmit(e) {
    e.preventDefault();
    const valid = this.form.formGroup.valid;
    const data = this.form.formGroup.value;
    const {tabs} = this.form;
    let res = {tabs: []};
    for (let tab of tabs) {
      const firstTabField = tab.fields[0].field;
      const isGridField = firstTabField.controlType === ControlType.Grid;
      if (tab.fields.length === 1 && isGridField) {
        let gridRes = {
          settings: {
            fields: []
          }
        };
        const gridSettings = firstTabField.settings as GridSettings;
        const {fields: gridFields, rowCount} = gridSettings;
        for (let rowNumber = 0; rowNumber < rowCount; rowNumber++) {
          gridRes.settings.fields[rowNumber] = {
            fields: []
          };
          for (let i = 0; i < gridFields.length; i++) {
            const {fieldId: gridFieldId} = gridFields[i];
            const gridFieldValue = data[`${gridFieldId}:${i}`];
            let gridFieldRes = {
              field: {[gridFieldId]: gridFieldValue}
            };
            gridRes.settings.fields[rowNumber].fields.push(gridFieldRes);
          }
        }
        res.tabs.push(gridRes);
      } else {
        const {fields: tabFields} = tab;
        let tabRes = {fields: []};
        for (let tabField of tabFields) {
          const field = tabField.field;
          const fieldId = field.fieldId;
          const value = data.get(fieldId);
          const tabFieldRes = {
            field: {[fieldId]: value}
          };
          tabRes.fields.push(tabFieldRes);
        }
        res.tabs.push(tabRes);
      }
    }
  }
}
