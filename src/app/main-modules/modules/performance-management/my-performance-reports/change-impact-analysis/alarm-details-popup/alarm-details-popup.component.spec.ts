import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmDetailsPopupComponent } from './alarm-details-popup.component';

describe('AlarmDetailsPopupComponent', () => {
  let component: AlarmDetailsPopupComponent;
  let fixture: ComponentFixture<AlarmDetailsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmDetailsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
