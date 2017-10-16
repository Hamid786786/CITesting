import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynModuleListComponent } from './dyn-module-list.component';
import {TranslatePipe} from '@pl-core/_pipes/translate.pipe';
import {RouterTestingModule} from '@angular/router/testing';

describe('DynModuleListComponent', () => {
  let component: DynModuleListComponent;
  let fixture: ComponentFixture<DynModuleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynModuleListComponent, TranslatePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynModuleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
