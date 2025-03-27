import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalGenerationPerformanceSummaryComponent } from './nominal-generation-performance-summary.component';

describe('NominalGenerationPerformanceSummaryComponent', () => {
  let component: NominalGenerationPerformanceSummaryComponent;
  let fixture: ComponentFixture<NominalGenerationPerformanceSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalGenerationPerformanceSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalGenerationPerformanceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
