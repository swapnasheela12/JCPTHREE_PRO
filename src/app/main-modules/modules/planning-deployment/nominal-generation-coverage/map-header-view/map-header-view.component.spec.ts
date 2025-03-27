import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapHeaderViewComponent } from './map-header-view.component';

describe('MapHeaderViewComponent', () => {
  let component: MapHeaderViewComponent;
  let fixture: ComponentFixture<MapHeaderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapHeaderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapHeaderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
