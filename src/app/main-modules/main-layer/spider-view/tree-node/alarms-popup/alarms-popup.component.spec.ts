import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmsPopupComponent } from './alarms-popup.component';

describe('AlarmsPopupComponent', () => {
  let component: AlarmsPopupComponent;
  let fixture: ComponentFixture<AlarmsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
