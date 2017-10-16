import {TestBed, inject} from '@angular/core/testing';

import {InboxService} from '../../../core/_services/communication/inbox.service';
import {ConnectionBackend, Http, RequestOptions} from '@angular/http';

describe('InboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InboxService, Http, ConnectionBackend, RequestOptions]
    });
  });

  xit('should be created', inject([InboxService], (service: InboxService) => {
    expect(service).toBeTruthy();
  }));
});
