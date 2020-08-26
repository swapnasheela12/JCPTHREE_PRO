import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayersCustComponent } from './layers-cust.component';

describe('LayersCustComponent', () => {
  let component: LayersCustComponent;
  let fixture: ComponentFixture<LayersCustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayersCustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayersCustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
