import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinZoomComponent } from './pin-zoom.component';

describe('PinZoomComponent', () => {
  let component: PinZoomComponent;
  let fixture: ComponentFixture<PinZoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinZoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
