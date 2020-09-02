import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedLayerMenuComponent } from './selected-layer-menu.component';

describe('SelectedLayerMenuComponent', () => {
  let component: SelectedLayerMenuComponent;
  let fixture: ComponentFixture<SelectedLayerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedLayerMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedLayerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
