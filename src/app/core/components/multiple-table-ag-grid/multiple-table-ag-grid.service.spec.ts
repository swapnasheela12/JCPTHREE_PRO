import { TestBed } from '@angular/core/testing';

import { TableAgGridService } from './table-ag-grid.service';

describe('TableAgGridService', () => {
  let service: TableAgGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableAgGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
