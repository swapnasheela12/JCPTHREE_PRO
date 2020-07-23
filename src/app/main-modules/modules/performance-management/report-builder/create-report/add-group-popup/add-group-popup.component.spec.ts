import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupPopupComponent } from './add-group-popup.component';

describe('AddGroupPopupComponent', () => {
  let component: AddGroupPopupComponent;
  let fixture: ComponentFixture<AddGroupPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroupPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
