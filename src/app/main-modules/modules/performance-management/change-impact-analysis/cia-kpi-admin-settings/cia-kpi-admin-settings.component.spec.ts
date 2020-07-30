import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiaKpiAdminSettingsComponent } from './cia-kpi-admin-settings.component';

describe('CiaKpiAdminSettingsComponent', () => {
  let component: CiaKpiAdminSettingsComponent;
  let fixture: ComponentFixture<CiaKpiAdminSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiaKpiAdminSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiaKpiAdminSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
