import { Observable } from 'rxjs/Observable';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { XHRBackend } from '@angular/http';
import { LoginService } from '@pl-core/_services';
import { ExceptionService } from './../utils/exception.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {TestBed, inject} from '@angular/core/testing';

describe('LoginService', () => {
  let LoginRes = [
    {
      slides: [
        {
          description: 'Dummy 1',
          url: 'assets/img/carousel1.jpg',
          state: 'current'
        },
        {
          description: 'Dummy 2',
          url: 'assets/img/carousel2.jpg',
          state: 'right'
        },
        {
          description: 'Dummy 3',
          url: 'assets/img/carousel3.jpg',
          state: 'right'
        },
        {
          description: 'Dummy 4',
          url: 'assets/img/carousel4.jpg',
          state: 'right'
        }
      ],
      tenantId: 'PC101',
      logoURL: 'assets/img/logo-1.png',
      logoALT: 'FROM MOCK API ConnektHub Platform',
      favicon: 'assets/icon/ch_ico.png',
      title: 'ConnektHub Log In'
    }
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [LoginService, ExceptionService]
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));

  it('getResources() function Validation', inject([LoginService], (service: LoginService) => {
      let tenantId = "PC101";
      let spyon = spyOn(service, 'getResources');
      spyon.and.returnValue(Observable.of(LoginRes));
      let resourceObj = service.getResources(tenantId);
      resourceObj.subscribe((res) => {
        expect(res[0]).toEqual(LoginRes[0]);
      });
  }));
});

// 