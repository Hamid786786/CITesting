import { TestBed, inject } from '@angular/core/testing';

import { DataListService } from './data-list.service';

describe('DataListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataListService]
    });
  });

  it('should be created', inject([DataListService], (service: DataListService) => {
    expect(service).toBeTruthy();
  }));
});
