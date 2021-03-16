import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmSummaryChartComponent } from './alarm-summary-chart.component';

describe('AlarmSummaryChartComponent', () => {
  let component: AlarmSummaryChartComponent;
  let fixture: ComponentFixture<AlarmSummaryChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmSummaryChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmSummaryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
