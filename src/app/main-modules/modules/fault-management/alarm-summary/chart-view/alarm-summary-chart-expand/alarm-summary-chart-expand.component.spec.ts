import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmSummaryChartExpandComponent } from './alarm-summary-chart-expand.component';

describe('AlarmSummaryChartExpandComponent', () => {
  let component: AlarmSummaryChartExpandComponent;
  let fixture: ComponentFixture<AlarmSummaryChartExpandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmSummaryChartExpandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmSummaryChartExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
