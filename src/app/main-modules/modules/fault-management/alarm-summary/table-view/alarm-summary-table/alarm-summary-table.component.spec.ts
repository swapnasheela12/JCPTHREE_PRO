import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmSummaryTableComponent } from './alarm-summary-table.component';

describe('AlarmSummaryTableComponent', () => {
  let component: AlarmSummaryTableComponent;
  let fixture: ComponentFixture<AlarmSummaryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmSummaryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
