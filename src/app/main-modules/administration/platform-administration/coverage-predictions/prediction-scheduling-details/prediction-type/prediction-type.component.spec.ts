import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionTypeComponent } from './prediction-type.component';

describe('PredictionTypeComponent', () => {
  let component: PredictionTypeComponent;
  let fixture: ComponentFixture<PredictionTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
