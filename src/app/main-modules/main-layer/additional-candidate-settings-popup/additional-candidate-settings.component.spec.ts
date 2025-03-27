import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdditionalCandidateSettingsPopupComponent } from './additional-candidate-settings.component';


describe('AdditionalCandidateSettingsPopupComponent', () => {
  let component: AdditionalCandidateSettingsPopupComponent;
  let fixture: ComponentFixture<AdditionalCandidateSettingsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalCandidateSettingsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalCandidateSettingsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
