import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpComponent } from './pop-up.component';
import {MdIcon} from '@angular/material';
import { IframeModule } from '../../iframe/iframe.module';

describe('PopUpComponent', () => {
  let component: PopUpComponent;
  let fixture: ComponentFixture<PopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IframeModule],      
      declarations: [ PopUpComponent, MdIcon ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
