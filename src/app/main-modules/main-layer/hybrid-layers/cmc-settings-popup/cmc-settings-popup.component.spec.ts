import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmcSettingsPopupComponent } from './cmc-settings-popup.component';

describe('CmcSettingsPopupComponent', () => {
  let component: CmcSettingsPopupComponent;
  let fixture: ComponentFixture<CmcSettingsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmcSettingsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmcSettingsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
