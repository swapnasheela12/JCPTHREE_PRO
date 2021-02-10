import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterCircleChartComponent } from './inter-circle-chart.component';

describe('InterCircleChartComponent', () => {
  let component: InterCircleChartComponent;
  let fixture: ComponentFixture<InterCircleChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterCircleChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterCircleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
