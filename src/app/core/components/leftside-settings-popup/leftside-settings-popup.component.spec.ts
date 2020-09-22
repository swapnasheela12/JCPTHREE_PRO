import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftsideSettingsPopupComponent } from './leftside-settings-popup.component';

describe('LeftsideSettingsPopupComponent', () => {
  let component: LeftsideSettingsPopupComponent;
  let fixture: ComponentFixture<LeftsideSettingsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftsideSettingsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftsideSettingsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
