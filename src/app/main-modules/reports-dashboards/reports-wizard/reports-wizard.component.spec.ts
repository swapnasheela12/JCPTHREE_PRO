import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsWizardComponent } from './reports-wizard.component';

describe('ReportsWizardComponent', () => {
  let component: ReportsWizardComponent;
  let fixture: ComponentFixture<ReportsWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
