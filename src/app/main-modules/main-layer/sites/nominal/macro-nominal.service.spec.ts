import { TestBed } from '@angular/core/testing';

import { MacroNominalService } from './macro-nominal.service';

describe('MacroNominalService', () => {
  let service: MacroNominalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MacroNominalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
