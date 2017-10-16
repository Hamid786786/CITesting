import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InboxComponent} from './inbox.component';
import {TranslateService} from '@pl-core/_services';
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
describe('InboxComponent', () => {
  let component: InboxComponent;
  let fixture: ComponentFixture<InboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InboxComponent],
      providers: [{provide: TranslateService, useClass: TranslateServiceStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
