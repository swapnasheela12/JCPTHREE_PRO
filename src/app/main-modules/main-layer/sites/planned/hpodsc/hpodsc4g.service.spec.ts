import { TestBed } from '@angular/core/testing';

import { Hpodsc4gService } from './hpodsc4g.service';

describe('Hpodsc4gService', () => {
  let service: Hpodsc4gService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Hpodsc4gService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
