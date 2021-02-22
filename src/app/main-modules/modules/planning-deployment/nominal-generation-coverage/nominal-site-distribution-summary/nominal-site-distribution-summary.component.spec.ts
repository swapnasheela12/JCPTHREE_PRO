import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalSiteDistributionSummaryComponent } from './nominal-site-distribution-summary.component';

describe('NominalSiteDistributionSummaryComponent', () => {
  let component: NominalSiteDistributionSummaryComponent;
  let fixture: ComponentFixture<NominalSiteDistributionSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalSiteDistributionSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalSiteDistributionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
