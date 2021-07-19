import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartScheduledPredictionsComponent } from './chart-scheduled-predictions.component';

describe('ChartScheduledPredictionsComponent', () => {
  let component: ChartScheduledPredictionsComponent;
  let fixture: ComponentFixture<ChartScheduledPredictionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartScheduledPredictionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartScheduledPredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
