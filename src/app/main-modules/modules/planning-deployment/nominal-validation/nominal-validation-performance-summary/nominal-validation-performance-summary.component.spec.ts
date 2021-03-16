import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalValidationPerformanceSummaryComponent } from './nominal-validation-performance-summary.component';

describe('NominalValidationPerformanceSummaryComponent', () => {
  let component: NominalValidationPerformanceSummaryComponent;
  let fixture: ComponentFixture<NominalValidationPerformanceSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalValidationPerformanceSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalValidationPerformanceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
