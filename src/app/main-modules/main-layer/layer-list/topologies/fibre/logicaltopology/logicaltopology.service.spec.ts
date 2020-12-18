import { TestBed } from '@angular/core/testing';

import { LogicaltopologyService } from './logicaltopology.service';

describe('LogicaltopologyService', () => {
  let service: LogicaltopologyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogicaltopologyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
