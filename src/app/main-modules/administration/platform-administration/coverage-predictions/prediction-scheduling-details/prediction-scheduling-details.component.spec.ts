import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionSchedulingDetailsComponent } from './prediction-scheduling-details.component';

describe('PredictionSchedulingDetailsComponent', () => {
  let component: PredictionSchedulingDetailsComponent;
  let fixture: ComponentFixture<PredictionSchedulingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionSchedulingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionSchedulingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
