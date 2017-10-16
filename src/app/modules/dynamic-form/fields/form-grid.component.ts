/**
 *  Displays fields in a table/grid view. Fields dynamically generated
 *  by input property 'fields'
 */

import {Component, Input, OnInit} from '@angular/core';
import {Field, GridSettings} from '@pl-core/_models';
import {FieldBaseComponent} from './field-base.component';

export interface RowActions {
  enableDelRow: boolean;
  enableCopyRow: boolean;
  enableFormView: boolean;
}

export interface GridActions {
  enableAddRow: boolean;
  enableImport: boolean;
  enableExport: boolean;
}

export interface IRow {
  fields: Field[];
  actions: RowActions;
}

export interface IGrid {
  gridActions: GridActions;
  rows: IRow[];
}

@Component({
  selector: 'pl-form-grid',
  templateUrl: './form-grid.component.html'
})
export class FormGridComponent extends FieldBaseComponent implements OnInit {
  public gridActions: GridActions;
  public actions;
  public headers: string[];
  public settings: GridSettings;
  public rows: IRow[] = [];

  public ngOnInit() {
    const gridReadOnly = this.field.isReadOnly;
    this.settings = this.field.settings as GridSettings;
    const {enableAddRow, enableDelRow, enableCopyRow, enableFormView, enableImport, enableExport} = this.settings;
    const actions = {enableDelRow, enableCopyRow, enableFormView};
    this.gridActions = {enableImport, enableExport, enableAddRow};
    if (this.settings.fields.length) {
      this.headers = this.settings.fields.map((field: any) => field.label);
      if (this.settings.rowCount) {
        for (let rowNumber = 0; rowNumber < this.settings.rowCount; rowNumber++) {
          let rowFields = this.settings.fields;
          // dont mutate the existing rowField, this leads to meaningless fieldIds like CLASS:0:1:2:3:4
          /*
           // BAD CODE EXAMPLE
           const rowFieldId = `${rowField.fieldId}:${rowNumber}`;
           rowField.rowFieldId = rowFieldId;
           */
          // use hideLabel to get the control to render without a placeholder
          let updatedRowFields = [];
          for (let rowField of rowFields) {
            const rowFieldId = `${rowField.fieldId}:${rowNumber}`;
            const nRowField = {
              ...rowField,
              fieldId: rowFieldId,
              hideLabel: true,
              isReadOnly: gridReadOnly || rowField.isReadOnly
            };
            updatedRowFields.push({field: nRowField});
          }
          this.rows.push({actions, fields: updatedRowFields});
        }
      }
    }
  }
}
