import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalValidationSummaryComponent } from './nominal-validation-summary.component';

describe('NominalValidationSummaryComponent', () => {
  let component: NominalValidationSummaryComponent;
  let fixture: ComponentFixture<NominalValidationSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalValidationSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalValidationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
