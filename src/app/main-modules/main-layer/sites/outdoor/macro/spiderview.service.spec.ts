/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpiderviewService } from './spiderview.service';

describe('Service: Spiderview', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpiderviewService]
    });
  });

  it('should ...', inject([SpiderviewService], (service: SpiderviewService) => {
    expect(service).toBeTruthy();
  }));
});
