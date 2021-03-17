import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAlarmExpandTableComponent } from './history-alarm-expand-table.component';

describe('HistoryAlarmExpandTableComponent', () => {
  let component: HistoryAlarmExpandTableComponent;
  let fixture: ComponentFixture<HistoryAlarmExpandTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryAlarmExpandTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryAlarmExpandTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
