import { TestBed } from '@angular/core/testing';

import { NavigationSettingsService } from './navigation-settings.service';

describe('NavigationSettingsService', () => {
  let service: NavigationSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
