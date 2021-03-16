import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalCapacityLayerComponent } from './nominal-capacity-layer.component';

describe('NominalCapacityLayerComponent', () => {
  let component: NominalCapacityLayerComponent;
  let fixture: ComponentFixture<NominalCapacityLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalCapacityLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalCapacityLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
