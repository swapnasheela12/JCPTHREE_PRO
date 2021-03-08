import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteListPopupComponent } from './complete-list-popup.component';

describe('CompleteListPopupComponent', () => {
  let component: CompleteListPopupComponent;
  let fixture: ComponentFixture<CompleteListPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteListPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
