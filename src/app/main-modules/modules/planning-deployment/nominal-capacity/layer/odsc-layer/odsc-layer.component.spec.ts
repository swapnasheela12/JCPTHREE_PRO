import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdscLayerComponent } from './odsc-layer.component';

describe('OdscLayerComponent', () => {
  let component: OdscLayerComponent;
  let fixture: ComponentFixture<OdscLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdscLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdscLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
