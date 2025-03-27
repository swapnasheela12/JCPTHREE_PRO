import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSelectionLayerComponent } from './site-selection-layer.component';

describe('SiteSelectionLayerComponent', () => {
  let component: SiteSelectionLayerComponent;
  let fixture: ComponentFixture<SiteSelectionLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteSelectionLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSelectionLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
