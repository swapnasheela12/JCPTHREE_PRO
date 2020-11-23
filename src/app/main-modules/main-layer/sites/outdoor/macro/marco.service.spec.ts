/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MarcoService } from './marco.service';

describe('Service: Marco', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarcoService]
    });
  });

  it('should ...', inject([MarcoService], (service: MarcoService) => {
    expect(service).toBeTruthy();
  }));
});
