// import {} from 'jasmine';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardDialogueComponent} from './dashboard-dialogue.component';
import {TranslatePipe} from '@pl-core/_pipes/translate.pipe';
import {MdIcon} from '@angular/material';
import { IframeModule } from '../../iframe/iframe.module';
// import { CoreModule } from '../../../core/core.module';
import { DashboardModule } from '@pl-modules/dashboard/dashboard.module';

describe('DashboardDialogueComponent', () => {
  let component: DashboardDialogueComponent;
  let fixture: ComponentFixture<DashboardDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IframeModule],
      declarations: [DashboardDialogueComponent, TranslatePipe,  MdIcon]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDialogueComponent);
    component = fixture.componentInstance;
    console.log(component);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
