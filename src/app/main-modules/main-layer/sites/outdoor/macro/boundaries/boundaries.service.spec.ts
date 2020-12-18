/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BoundariesService } from './boundaries.service';

describe('Service: Boundaries', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoundariesService]
    });
  });

  it('should ...', inject([BoundariesService], (service: BoundariesService) => {
    expect(service).toBeTruthy();
  }));
});
