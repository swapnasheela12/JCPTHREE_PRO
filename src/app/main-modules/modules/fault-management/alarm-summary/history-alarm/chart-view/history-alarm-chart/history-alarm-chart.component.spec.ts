import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAlarmChartComponent } from './history-alarm-chart.component';

describe('HistoryAlarmChartComponent', () => {
  let component: HistoryAlarmChartComponent;
  let fixture: ComponentFixture<HistoryAlarmChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryAlarmChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryAlarmChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
