import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAlarmExpandChartComponent } from './history-alarm-expand-chart.component';

describe('HistoryAlarmExpandChartComponent', () => {
  let component: HistoryAlarmExpandChartComponent;
  let fixture: ComponentFixture<HistoryAlarmExpandChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryAlarmExpandChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryAlarmExpandChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
