/**
 *  Multi-select dropdown field
 *  Dropdown hides upon clicking outside the component (ExternalClickDirective)
 *  Implemented as a custom form control due to lack of similar native
 *  HTML functionality.
 *
 *  ISSUES:
 *  - Limit number of items in title?
 *  - Styling inconsistencies with other field components
 *  - Clicking title to close dropdown does not lose focus
 */

import {
  Component, Input, OnInit, DoCheck, forwardRef,
  Renderer, IterableDiffer, IterableDiffers
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {FieldBaseComponent} from './field-base.component';
import {ISelectItem} from '@pl-core/_interfaces';

export interface MultiSelectSettings {
  checkedStyle?: string;
  selectionLimit?: number;
  showCheckAll?: boolean;
  showUncheckAll?: boolean;
  defaultTitle?: string;
  titleMaxItems?: number;
  maxHeight?: string;
}

// Provide a custom value accessor (service) for this component
/* tslint:disable:no-forward-ref */
const MULTISELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FieldMultiSelectComponent),
  multi: true // append to (not overwrite) Angular's NG_VALUE_ACCESSOR token
};

@Component({
  selector: 'pl-multiselect-field',
  templateUrl: './field-multiselect.component.html',
  providers: [MULTISELECT_VALUE_ACCESSOR]
})

export class FieldMultiSelectComponent implements ControlValueAccessor, OnInit, DoCheck {
  @Input() public field;
  @Input() public form;
  @Input() public options: ISelectItem[];
  @Input() public settings: MultiSelectSettings;

  public value: any[];
  public title: string;
  public numSelected: number = 0;
  public isVisible: boolean = false;
  public differ: IterableDiffer<any>;

  public defaultSettings: MultiSelectSettings = {
    checkedStyle: 'checkboxes',
    selectionLimit: 0,
    showCheckAll: false,
    showUncheckAll: false,
    defaultTitle: 'Select',
    titleMaxItems: 3,
    maxHeight: '300px'
  };

  constructor(private _renderer: Renderer,
              private _differs: IterableDiffers) {
  }

  public onModelChange = (_: any) => {
    // console.log('called');
  }
  public onModelTouched = () => {
    // console.log('called');
  }

  public ngOnInit() {
    this.settings = Object.assign(this.defaultSettings, this.settings);
    this.title = this.settings.defaultTitle;
    // Create an IterableDiffer instance for arrays
    this.differ = this._differs.find([]).create(null);
  }

  // The ngDoCheck hook is called during every change detection run,
  // in this case we want to update the model when this.value changes
  // from the view (due to user input)
  public ngDoCheck() {
    // 'differ' is an IterableDiffer used to track changes to an
    // iterable, in this case our array of selected values. See:
    // https://teropa.info/blog/2016/03/06/writing-an-angular-2-template-directive.html
    const changes = this.differ.diff(this.value);

    if (changes) {
      this.updateNumSelected();
      this.updateTitle();
    }
  }

  public onTitleClick(): void {
    this.isVisible = !this.isVisible;
  }

  public hide(): void {
    this.isVisible = false;

  }

  public updateNumSelected(): void {
    this.numSelected = this.value ? this.value.length : 0;
    // console.log('numSelected: ', this.numSelected);
  }

  public updateTitle(): void {
    let newTitle = '';

    if (this.value && this.numSelected > 0) {
      newTitle = this.options
        .filter((option: ISelectItem) => this.isSelected(option.value))
        .map((selected: ISelectItem) => selected.label)
        .join(', ');
    } else {
      newTitle = this.settings.defaultTitle;
    }

    this.title = newTitle;
  }

  public onItemClick(event: MouseEvent, val: any): void {
    // event.preventDefault();
    const selectedIndex = this.findSelectionIndex(val);
    if (selectedIndex > -1) {
      this.value.splice(selectedIndex, 1); // remove already selected items
    } else {
      this.value = this.value || []; // complains this.value is undefined otherwise
      this.value.push(val);
    }

    this.onModelChange(this.value);
  }

  public findSelectionIndex(val: any): number {
    let index = -1;

    if (this.value) {
      index = this.value.indexOf(val);
    }

    return index;
  }

  public isSelected(val: any): boolean {
    return this.findSelectionIndex(val) !== -1;
  }

  // ControlValueAccessor interface - bridges view/template with
  // model/component. See:
  // http://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html
  public writeValue(val: any): void {
    if (val !== undefined) {
      this.value = val;
    }
  }

  public registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }
}
/* tslint:enable:no-forward-ref */
