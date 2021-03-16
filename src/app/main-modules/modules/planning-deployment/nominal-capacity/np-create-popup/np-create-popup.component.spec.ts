import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpCreatePopupComponent } from './np-create-popup.component';

describe('NpCreatePopupComponent', () => {
  let component: NpCreatePopupComponent;
  let fixture: ComponentFixture<NpCreatePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpCreatePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpCreatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
