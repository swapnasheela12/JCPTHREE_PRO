/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NodesAndBoundariesManagerService } from './nodes-and-boundaries-manager.service';

describe('Service: NodesAndBoundariesManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodesAndBoundariesManagerService]
    });
  });

  it('should ...', inject([NodesAndBoundariesManagerService], (service: NodesAndBoundariesManagerService) => {
    expect(service).toBeTruthy();
  }));
});
