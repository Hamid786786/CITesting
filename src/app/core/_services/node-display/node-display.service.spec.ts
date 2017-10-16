import { TestBed, inject } from '@angular/core/testing';

import { NodeDisplayService } from './node-display.service';

describe('NodeDisplayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeDisplayService]
    });
  });

  it('should be created', inject([NodeDisplayService], (service: NodeDisplayService) => {
    expect(service).toBeTruthy();
  }));
});
