import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiaAdminSettingsComponent } from './cia-kpi-admin-settings.component';

describe('CiaAdminSettingsComponent', () => {
  let component: CiaAdminSettingsComponent;
  let fixture: ComponentFixture<CiaAdminSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiaAdminSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiaAdminSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
