import { TestBed } from '@angular/core/testing';

import { FmDataSharingService } from './fm-data-sharing.service';

describe('FmDataSharingService', () => {
  let service: FmDataSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FmDataSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
