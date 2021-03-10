import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmSummaryTableExpandComponent } from './alarm-summary-table-expand.component';

describe('AlarmSummaryTableExpandComponent', () => {
  let component: AlarmSummaryTableExpandComponent;
  let fixture: ComponentFixture<AlarmSummaryTableExpandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmSummaryTableExpandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmSummaryTableExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
