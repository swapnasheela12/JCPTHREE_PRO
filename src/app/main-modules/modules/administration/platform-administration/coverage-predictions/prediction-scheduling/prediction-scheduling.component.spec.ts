import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionSchedulingComponent } from './prediction-scheduling.component';

describe('PredictionSchedulingComponent', () => {
  let component: PredictionSchedulingComponent;
  let fixture: ComponentFixture<PredictionSchedulingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionSchedulingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
