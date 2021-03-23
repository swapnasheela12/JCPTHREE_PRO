import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfiSurveyFormComponent } from './rfi-survey-form.component';

describe('RfiSurveyFormComponent', () => {
  let component: RfiSurveyFormComponent;
  let fixture: ComponentFixture<RfiSurveyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfiSurveyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfiSurveyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
