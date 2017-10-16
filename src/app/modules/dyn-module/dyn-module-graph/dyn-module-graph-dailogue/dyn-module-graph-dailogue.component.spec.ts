import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DynModuleDailogueComponent} from "../../dyn-module-dailogue/dyn-module-dailogue.component";

//import { DynModuleDailogueComponent } from './dyn-module-dailogue.component';

describe('DynModuleGarphDailogueComponent', () => {
  let component: DynModuleDailogueComponent;
  let fixture: ComponentFixture<DynModuleDailogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynModuleDailogueComponent ]
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
