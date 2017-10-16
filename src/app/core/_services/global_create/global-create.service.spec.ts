import { TestBed, inject } from '@angular/core/testing';

import { GlobalCreateService } from './global-create.service';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {ExceptionService} from '../utils/exception.service';

describe('GlobalCreateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientModule],
      providers: [GlobalCreateService, HttpClient, ExceptionService]
    });
  });

  it('should be created', inject([GlobalCreateService], (service: GlobalCreateService) => {
    expect(service).toBeTruthy();
  }));
});
