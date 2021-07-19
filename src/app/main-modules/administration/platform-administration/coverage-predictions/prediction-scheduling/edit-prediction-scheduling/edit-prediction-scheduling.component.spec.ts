import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPredictionSchedulingComponent } from './edit-prediction-scheduling.component';

describe('EditPredictionSchedulingComponent', () => {
  let component: EditPredictionSchedulingComponent;
  let fixture: ComponentFixture<EditPredictionSchedulingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPredictionSchedulingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPredictionSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
