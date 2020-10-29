import { TestBed } from '@angular/core/testing';

import { SmallCellService } from './small-cell.service';

describe('SmallCellService', () => {
  let service: SmallCellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmallCellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
