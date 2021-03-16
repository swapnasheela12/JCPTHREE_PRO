import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalValidationOptimizationSummaryComponent } from './nominal-validation-optimization-summary.component';

describe('NominalValidationOptimizationSummaryComponent', () => {
  let component: NominalValidationOptimizationSummaryComponent;
  let fixture: ComponentFixture<NominalValidationOptimizationSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalValidationOptimizationSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalValidationOptimizationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
