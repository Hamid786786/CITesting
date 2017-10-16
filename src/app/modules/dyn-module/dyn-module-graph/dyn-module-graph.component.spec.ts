import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynModuleGraphComponent } from './dyn-module-graph.component';
import {TranslatePipe} from '@pl-core/_pipes/translate.pipe';
import {RouterTestingModule} from '@angular/router/testing';

describe('DynModuleGraphComponent', () => {
  let component: DynModuleGraphComponent;
  let fixture: ComponentFixture<DynModuleGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynModuleGraphComponent, TranslatePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynModuleGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
