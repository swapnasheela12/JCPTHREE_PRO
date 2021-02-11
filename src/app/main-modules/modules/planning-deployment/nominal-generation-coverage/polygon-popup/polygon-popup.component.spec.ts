import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolygonPopupComponent } from './polygon-popup.component';

describe('PolygonPopupComponent', () => {
  let component: PolygonPopupComponent;
  let fixture: ComponentFixture<PolygonPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolygonPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolygonPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
