import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentsPlannedFibreCoreComponent } from './equipments-planned-fibre-core.component';

describe('EquipmentsPlannedFibreCoreComponent', () => {
  let component: EquipmentsPlannedFibreCoreComponent;
  let fixture: ComponentFixture<EquipmentsPlannedFibreCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsPlannedFibreCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentsPlannedFibreCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
