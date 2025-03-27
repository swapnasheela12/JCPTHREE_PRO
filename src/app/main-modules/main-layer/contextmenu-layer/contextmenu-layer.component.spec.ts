import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextmenuLayerComponent } from './contextmenu-layer.component';

describe('ContextmenuLayerComponent', () => {
  let component: ContextmenuLayerComponent;
  let fixture: ComponentFixture<ContextmenuLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextmenuLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextmenuLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
