import { TestBed } from '@angular/core/testing';

import { DataSharHttpService } from './data-shar-http.service';

describe('DataSharHttpService', () => {
  let service: DataSharHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSharHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
