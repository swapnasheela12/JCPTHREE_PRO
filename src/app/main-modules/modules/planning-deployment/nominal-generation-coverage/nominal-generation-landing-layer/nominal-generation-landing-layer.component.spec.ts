import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalGenerationLandingLayerComponent } from './nominal-generation-landing-layer.component';

describe('NominalGenerationLandingLayerComponent', () => {
  let component: NominalGenerationLandingLayerComponent;
  let fixture: ComponentFixture<NominalGenerationLandingLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalGenerationLandingLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalGenerationLandingLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
