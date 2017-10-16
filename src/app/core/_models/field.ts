type ValueType =
  'CHAR'
  | 'NUMC'
  | 'DEC'
  | 'STATUS'
  | 'EMAIL'
  | 'DATS'
  | 'DTMS'
  | 'PASS'
  | 'TIMS'
  | 'ALTN'
  | 'ISCN'
  | 'REQ'
  | 'TTYPE'
  | 'VARC'
  | 'UNIT';
type AttachmentType =
  '.DOC'
  | '.DOCX'
  | '.PDF'
  | '.XLS'
  | '.XLSX'
  | '.LOG'
  | '.MSG'
  | '.ODT'
  | '.PAGES'
  | '.RTF'
  | '.TEX'
  | '.TXT'
  | '.WPD'
  | '.WPS'
  | '.CSV'
  | '.DAT'
  | '.GED'
  | '.KEY'
  | '.KEYCHAIN'
  | '.PPS'
  | '.PPTX'
  | '.SDF'
  | '.TAR'
  | '.TAX2014'
  | '.TAX2015'
  | '.VCF'
  | '.XML'
  | '.AIF'
  | '.IFF'
  | '.M3U'
  | '.M4A'
  | '.MID'
  | '.MP3'
  | '.MPA'
  | '.WAV'
  | '.WMA'
  | '.3DM'
  | '.3DS'
  | '.MAX'
  | '.OBJ'
  | '.BMP'
  | '.DDM'
  | '.GIF'
  | '.JPG'
  | '.PNG'
  | '.PSD'
  | '.PSPIMAGE'
  | '.TAG'
  | '.THM'
  | '.TIF'
  | '.TIFF'
  | '.YUV'
  | '.HTML'
  | '.HTM'
  | '.7Z'
  | '.CBR'
  | '.DEB'
  | '.GZ'
  | '.PKG'
  | '.RAR'
  | '.RPM'
  | '.SITX'
  | '.TAR.GZ'
  | '.ZIP'
  | '.ZIPX';
type DropDownColorType = 'BACKGROUND' | 'BORDER';

type javaScriptEvents = 'onblur' | 'onchange' | 'onkeyup' | 'onfocus' | 'onkeypress' | 'onclick' | 'onselect';

/*
 TextBox ControlType uses the valueType field and represents:
 Input Text,
 Date: DATS,
 Date Time: DTMS,
 Times: TIMS,
 Email: EMAIL,
 Password Field: PASS
 */
export enum ControlType {
  TextBox = 0,
  DropDown = 1,
  CheckBox = 2,
  DigitalSign = 44,
  RadioButton = 4,
  TextArea = 22,
  GroupField = 14,
  ModuleReferenceID = 30, // ModuleReferenceID , Module Reference Data
  UserSelection = 37,
  LocationReference = 29,
  Attachment = 28,
  Grid = 15,
  HTML = 31,
  Calculation = 25,
  URL = 33,
  Tree = 5,
  RejectionType = 38,
  Activate_Deactivate = 35

}
export class DecimalSettings {
  public separator: string;
  public lengthAfterSeparator: number;
}

export class DateSettings {
  public setDefaultDate: boolean;
  public pastDate: boolean;
  public futureDate: boolean;
  public financialStartDate: boolean;
  public financialEndDate: boolean;
  public withinfinancialYear: boolean;
}

export class TextAreaSettings {
  public areaHeight: number;
}

export class GroupField {
  public label: string;
  public length: number;
}

export class GroupSettings {
  public separator: string;
  public fields: GroupField[];
}

export class ModuleReferenceSettings {
  public referenceModule: string;
  public searchField: string;
  public isMultiSelect: boolean;
}

export class ImageMarkerSettings {
  public imageWidth: string;
  public imageHeight: string;
}
export class AttachmentSettings {
  public attachmentSize: number;
  public isMultiSelect: boolean;
  public isImageMarker: boolean;
  public imageMarkerSettings: ImageMarkerSettings;
  public attachmentType: AttachmentType[];
}

export class CalculationSettings {
  public formula: string;
}

export class ReferenceFields {
  public fieldId: string;
  public controlType: ControlType;
}

export class ModuleReferenceDataSettings {
  public referenceModule: string;
  public referenceFields: ReferenceFields[];
}

export class GridSettings {
  public rowCount: number;
  public enableAddRow: boolean;
  public enableDelRow: boolean;
  public enableCopyRow: boolean;
  public enableFormView: boolean;
  public enableImport: boolean;
  public enableExport: boolean;
  public sortField: string;
  public sortInAscendingOrder: boolean;
  public sequenceField: string;
  public sequenceInterval: string;
  public sequenceStart: string;
  public fields: Field[];
  public subGrid: Field[];
}

export class DropDownSettings {
  public isDependent: boolean;
  public dependentField: string;
  public isMultiSelect: boolean;
  public isStyled: boolean;
  public isMatrix: boolean;
  public rowField: string;
  public columnField: string;
}

export class Script {
  public script: string;
}

export class ExitEvents {
  public event: javaScriptEvents;
  public scripts: Script[];
}

export class JavaScriptExit {
  public exits: ExitEvents[];
}

export class Field {
  public fieldId: string;
  public label: string;
  public valueType: ValueType;
  public controlType: ControlType;
  public length: number;
  public isReadOnly: boolean;
  public isHidden: boolean;
  public isMandatory: boolean;
  public helpText: string;
  public javaScriptExits: JavaScriptExit;
  public settings: DecimalSettings | TextAreaSettings |
    GroupSettings | ModuleReferenceSettings | AttachmentSettings | DateSettings |
    CalculationSettings | ModuleReferenceDataSettings | GridSettings | DropDownSettings;
}
