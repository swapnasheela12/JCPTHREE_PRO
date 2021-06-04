import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraiQosCallPlanComponent } from './trai-qos-call-plan.component';

describe('TraiQosCallPlanComponent', () => {
  let component: TraiQosCallPlanComponent;
  let fixture: ComponentFixture<TraiQosCallPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraiQosCallPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraiQosCallPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
