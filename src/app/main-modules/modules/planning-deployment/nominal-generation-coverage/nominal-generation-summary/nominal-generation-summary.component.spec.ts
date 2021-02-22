import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalGenerationSummaryComponent } from './nominal-generation-summary.component';

describe('NominalGenerationSummaryComponent', () => {
  let component: NominalGenerationSummaryComponent;
  let fixture: ComponentFixture<NominalGenerationSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalGenerationSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalGenerationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
