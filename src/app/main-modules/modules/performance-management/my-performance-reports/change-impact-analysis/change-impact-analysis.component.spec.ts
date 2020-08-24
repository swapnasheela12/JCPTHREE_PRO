import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeImpactAnalysisComponent } from './change-impact-analysis.component';

describe('ChangeImpactAnalysisComponent', () => {
  let component: ChangeImpactAnalysisComponent;
  let fixture: ComponentFixture<ChangeImpactAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeImpactAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeImpactAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
