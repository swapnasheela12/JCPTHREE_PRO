import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalValidationSiteDistributionSummaryComponent } from './nominal-validation-site-distribution-summary.component';

describe('NominalValidationSiteDistributionSummaryComponent', () => {
  let component: NominalValidationSiteDistributionSummaryComponent;
  let fixture: ComponentFixture<NominalValidationSiteDistributionSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalValidationSiteDistributionSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalValidationSiteDistributionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
