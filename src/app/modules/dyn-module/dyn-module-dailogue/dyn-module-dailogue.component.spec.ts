import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynModuleDailogueComponent } from './dyn-module-dailogue.component';
import {TranslatePipe} from '@pl-core/_pipes/translate.pipe';
import { MaterialModule, MdDialogRef } from '@angular/material';
import { TranslateService } from '@pl-core/_services/translate/translate.service';


export class MdDialogRefMock {};
export class TranslateServiceMock {};

describe('DynModuleDailogueComponent', () => {
  let component: DynModuleDailogueComponent;
  let fixture: ComponentFixture<DynModuleDailogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ DynModuleDailogueComponent, TranslatePipe ],
      providers: [
        {provide: TranslateService , useClass: TranslateServiceMock},
        {provide: MdDialogRef, useClass: MdDialogRefMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynModuleDailogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
