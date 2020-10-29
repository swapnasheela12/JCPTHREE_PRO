import { TestBed } from '@angular/core/testing';

import { MacroPlanned4gService } from './macro-planned-4g.service';

describe('MacroPlanned4gService', () => {
  let service: MacroPlanned4gService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MacroPlanned4gService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
