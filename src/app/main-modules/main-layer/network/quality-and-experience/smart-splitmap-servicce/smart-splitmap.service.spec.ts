/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SmartSplitmapService } from './smart-splitmap.service';

describe('Service: SmartSplitmap', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmartSplitmapService]
    });
  });

  it('should ...', inject([SmartSplitmapService], (service: SmartSplitmapService) => {
    expect(service).toBeTruthy();
  }));
});
