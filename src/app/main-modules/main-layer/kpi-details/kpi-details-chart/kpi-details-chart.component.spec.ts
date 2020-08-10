import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiDetailsChartComponent } from './kpi-details-chart.component';

describe('KpiDetailsChartComponent', () => {
  let component: KpiDetailsChartComponent;
  let fixture: ComponentFixture<KpiDetailsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiDetailsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiDetailsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
