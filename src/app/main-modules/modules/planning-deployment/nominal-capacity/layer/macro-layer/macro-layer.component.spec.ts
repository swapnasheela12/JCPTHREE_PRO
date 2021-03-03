import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroLayerComponent } from './macro-layer.component';

describe('MacroLayerComponent', () => {
  let component: MacroLayerComponent;
  let fixture: ComponentFixture<MacroLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacroLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
