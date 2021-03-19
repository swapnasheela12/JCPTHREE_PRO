import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpQaSaveQueryPopupComponent } from './np-qa-save-query-popup.component';

describe('NpQaSaveQueryPopupComponent', () => {
  let component: NpQaSaveQueryPopupComponent;
  let fixture: ComponentFixture<NpQaSaveQueryPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpQaSaveQueryPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpQaSaveQueryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
