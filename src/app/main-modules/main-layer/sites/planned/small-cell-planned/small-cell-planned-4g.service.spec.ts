import { TestBed } from '@angular/core/testing';

import { SmallCellPlanned4gService } from './small-cell-planned-4g.service';

describe('SmallCellPlanned4gService', () => {
  let service: SmallCellPlanned4gService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmallCellPlanned4gService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
