import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentDetailsComponent } from './appointment-details.component';
import {TranslatePipe} from '@pl-core/_pipes/translate.pipe';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ExceptionService} from '@pl-core/_services/utils/exception.service';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateService} from '@pl-core/_services/translate/translate.service';
import {InjectionToken} from '@angular/core';

//TODO, need to fix it soon
describe('AppointmentDetailsComponent', () => {
  let component: AppointmentDetailsComponent;
  let fixture: ComponentFixture<AppointmentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ AppointmentDetailsComponent, TranslatePipe],
      providers: [HttpClient, ExceptionService, TranslateService, InjectionToken]
    })
    .compileComponents();
    let TRANSLATIONS = new InjectionToken<string>('translations');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
