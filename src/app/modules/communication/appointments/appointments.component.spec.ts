import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpModule, Http, BaseRequestOptions, XHRBackend} from '@angular/http';
import {AppointmentsComponent} from './appointments.component';
import {TranslatePipe} from '@pl-core/_pipes';
import {TranslateService} from '@pl-core/_services';

let http: Http;
class TranslateServiceStub {
  public currentLang: string;

  public use(lang: string) {
    this.currentLang = lang;
  }

  public instant(key: string) {
    return 'translated';
  }

  public instantWithLang(key: string, lang: string) {
    return `translated to ${lang}`;
  }
}
describe('AppointmentsComponent', () => {
  let component: AppointmentsComponent;
  let fixture: ComponentFixture<AppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsComponent],
      providers: [{provide: TranslateService, useClass: TranslateServiceStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
