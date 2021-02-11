import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalGenerationLayerComponent } from './nominal-generation-layer.component';

describe('NominalGenerationLayerComponent', () => {
  let component: NominalGenerationLayerComponent;
  let fixture: ComponentFixture<NominalGenerationLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalGenerationLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalGenerationLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
