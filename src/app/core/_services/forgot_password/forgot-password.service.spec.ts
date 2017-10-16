import { Observable } from 'rxjs/Observable';
import { ExceptionService } from '@pl-core/_services/utils/exception.service';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordService } from '@pl-core/_services';
import { TestBed, inject } from '@angular/core/testing';

describe('ForgotPasswordService', () => {
  let validuser = [
        {
          id: 100,
          username: 'jayant',
          status: 200,
          message: 'Link Sent!!! Check your Email.'
        }
      ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientModule],
      providers: [ForgotPasswordService, ExceptionService]
    });
  });

  it('should be created', inject([ForgotPasswordService], (service: ForgotPasswordService) => {
    expect(service).toBeTruthy();
  }));

  it('Should get Link sent message If the username is valid',
    inject([ForgotPasswordService], (service: ForgotPasswordService) => {
        let username = "jayant";
        let spyon = spyOn(service, 'checkUser');
        spyon.and.returnValue(Observable.of(validuser));
        let checkuserObj = service.checkUser(username);
        checkuserObj.subscribe((res) => {
            expect(res[0]).toEqual(validuser[0]);
        })
  }));

  it('Should get Error message If the username is invalid',
  inject([ForgotPasswordService], (service: ForgotPasswordService) => {
      let username = "Invaliduser";
      let spyon = spyOn(service, 'checkUser');
      spyon.and.returnValue(Observable.of(validuser));
      let checkuserObj = service.checkUser(username);
      expect(checkuserObj[0]).toBeUndefined();
}));

  it('Validation for get functions ',
  inject([ForgotPasswordService], (service: ForgotPasswordService) => {
    let username = "jayant m";
    let id = 103;
    service.setUser(username, id);
    let userName = service.getUserName();
    let userID = service.getUserId();
    expect(userName).toBe(username);
    expect(userID).toBe(id);
  }));

});