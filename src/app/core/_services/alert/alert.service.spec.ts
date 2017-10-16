import { TestBed, inject } from '@angular/core/testing';
import {Router} from '@angular/router';
import { AlertService } from './alert.service';
import {Observable} from 'rxjs/Observable';
public class RouterStub {
  public events = Observable.of({});
}
describe('AlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertService, {provide: Router, useClass: RouterStub}]
    });
  });

  it('should be created', inject([AlertService], (service: AlertService) => {
    expect(service).toBeTruthy();
  }));
});
