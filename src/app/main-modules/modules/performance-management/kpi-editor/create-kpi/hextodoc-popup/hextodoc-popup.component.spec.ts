import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HextodocPopupComponent } from './hextodoc-popup.component';

describe('HextodocPopupComponent', () => {
  let component: HextodocPopupComponent;
  let fixture: ComponentFixture<HextodocPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HextodocPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HextodocPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
