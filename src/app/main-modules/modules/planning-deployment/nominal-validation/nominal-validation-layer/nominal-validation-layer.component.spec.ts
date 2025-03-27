import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalValidationLayerComponent } from './nominal-validation-layer.component';

describe('NominalValidationLayerComponent', () => {
  let component: NominalValidationLayerComponent;
  let fixture: ComponentFixture<NominalValidationLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalValidationLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalValidationLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
