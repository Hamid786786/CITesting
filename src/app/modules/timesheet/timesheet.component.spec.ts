import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdDialogRef, MaterialModule } from '@angular/material';
// import { MdDialog } from '@angular/material';
import { TranslatePipe } from '@pl-core/_pipes/translate.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetComponent } from './timesheet.component';
import {LoadingService, TranslateService} from '@pl-core/_services';

export class TranslateSericeStub {
  public instant = jasmine.createSpy('instant');
};
export class LoadingSericeStub {
  public hide = jasmine.createSpy('hide');
  public show = jasmine.createSpy('show');
}
export class MdDialogRefMock {};

describe('TimesheetComponent', () => {
  let component: TimesheetComponent;
  let fixture: ComponentFixture<TimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule],
      declarations: [ TimesheetComponent, TranslatePipe ],
      providers: [ {provide: TranslateService, useClass: TranslateSericeStub},
                  {provide: LoadingService, useClass: LoadingSericeStub},
                  {provide: MdDialogRef, useClass: MdDialogRefMock }
                ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
