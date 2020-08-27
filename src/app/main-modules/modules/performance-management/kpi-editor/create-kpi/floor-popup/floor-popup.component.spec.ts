import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorPopupComponent } from './floor-popup.component';

describe('FloorPopupComponent', () => {
  let component: FloorPopupComponent;
  let fixture: ComponentFixture<FloorPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
