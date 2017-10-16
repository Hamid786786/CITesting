import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynModuleMapComponent } from './dyn-module-map.component';

describe('DynModuleMapComponent', () => {
  let component: DynModuleMapComponent;
  let fixture: ComponentFixture<DynModuleMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynModuleMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynModuleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
