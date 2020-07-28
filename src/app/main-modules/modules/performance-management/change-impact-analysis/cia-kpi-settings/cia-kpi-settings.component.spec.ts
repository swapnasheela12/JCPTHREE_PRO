import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiaKpiSettingsComponent } from './cia-kpi-settings.component';

describe('CiaKpiSettingsComponent', () => {
  let component: CiaKpiSettingsComponent;
  let fixture: ComponentFixture<CiaKpiSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiaKpiSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiaKpiSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
