import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFlagPopupComponent } from './custom-flag-popup.component';

describe('CustomFlagPopupComponent', () => {
  let component: CustomFlagPopupComponent;
  let fixture: ComponentFixture<CustomFlagPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomFlagPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFlagPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
