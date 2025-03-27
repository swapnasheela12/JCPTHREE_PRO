import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalGenerationCoverageComponent } from './nominal-generation-coverage.component';

describe('NominalGenerationCoverageComponent', () => {
  let component: NominalGenerationCoverageComponent;
  let fixture: ComponentFixture<NominalGenerationCoverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalGenerationCoverageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalGenerationCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
