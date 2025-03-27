/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SyncmapsService } from './syncmaps.service';

describe('Service: Syncmaps', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SyncmapsService]
    });
  });

  it('should ...', inject([SyncmapsService], (service: SyncmapsService) => {
    expect(service).toBeTruthy();
  }));
});
