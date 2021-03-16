import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmSummaryTableAllComponent } from './alarm-summary-table-all.component';

describe('AlarmSummaryTableAllComponent', () => {
  let component: AlarmSummaryTableAllComponent;
  let fixture: ComponentFixture<AlarmSummaryTableAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmSummaryTableAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmSummaryTableAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
