/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NodesService } from './nodes.service';

describe('Service: Nodes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodesService]
    });
  });

  it('should ...', inject([NodesService], (service: NodesService) => {
    expect(service).toBeTruthy();
  }));
});
