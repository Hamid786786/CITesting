import {Field} from './field';
import {FormGroup, FormControl} from '@angular/forms';
export class FieldOfTab {
  public field: Field;
  public isMandatory: boolean;
  public isHidden: boolean;
  public isReadOnly: boolean;
}

export class Tab {
  public label: string;
  public fields: FieldOfTab[];
}

export class Form {
  public tabs: Tab[];
  public formGroup?: FormGroup;
}

export interface GetForm {
  moduleId: string ;
  roleId: string ;
  userId: string ;
  eventId: string;
  moduleNo?: string;
}
