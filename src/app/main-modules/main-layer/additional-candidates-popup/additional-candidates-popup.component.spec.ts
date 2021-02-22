import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalCandidatesPopupComponent } from './additional-candidates-popup.component';

describe('AdditionalCandidatesPopupComponent', () => {
  let component: AdditionalCandidatesPopupComponent;
  let fixture: ComponentFixture<AdditionalCandidatesPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalCandidatesPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalCandidatesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
