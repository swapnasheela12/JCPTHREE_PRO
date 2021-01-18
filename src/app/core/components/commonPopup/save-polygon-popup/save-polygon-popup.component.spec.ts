import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePolygonPopupComponent } from './save-polygon-popup.component';

describe('SavePolygonPopupComponent', () => {
  let component: SavePolygonPopupComponent;
  let fixture: ComponentFixture<SavePolygonPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavePolygonPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePolygonPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
