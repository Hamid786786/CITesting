import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynModuleSummaryComponent } from './dyn-module-summary.component';
import {TranslatePipe} from '@pl-core/_pipes/translate.pipe';
import {RouterTestingModule} from '@angular/router/testing';
import { Router, RouterModule } from '@angular/router';
import { TranslateService } from '../../core/_services/translate/translate.service';

export class MockRouter {};
export class TranslateServiceMock{};
describe('DynModuleSummaryComponent', () => {
  let component: DynModuleSummaryComponent;
  let fixture: ComponentFixture<DynModuleSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, RouterModule ],
      declarations: [ DynModuleSummaryComponent, TranslatePipe ],
      providers: [ {provide: Router,  useClass: MockRouter },
        {provide: TranslateService, useClass: TranslateServiceMock}
        // TranslateService
      ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynModuleSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
