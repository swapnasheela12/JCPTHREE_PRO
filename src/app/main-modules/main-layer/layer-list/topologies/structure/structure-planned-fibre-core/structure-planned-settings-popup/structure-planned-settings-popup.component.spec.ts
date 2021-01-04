import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructurePlannedSettingsPopupComponent } from './structure-planned-settings-popup.component';

describe('StructurePlannedSettingsPopupComponent', () => {
  let component: StructurePlannedSettingsPopupComponent;
  let fixture: ComponentFixture<StructurePlannedSettingsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructurePlannedSettingsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructurePlannedSettingsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
