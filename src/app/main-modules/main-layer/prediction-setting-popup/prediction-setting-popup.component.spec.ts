import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionSettingPopupComponent } from './prediction-setting-popup.component';

describe('PredictionSettingPopupComponent', () => {
  let component: PredictionSettingPopupComponent;
  let fixture: ComponentFixture<PredictionSettingPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionSettingPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionSettingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
