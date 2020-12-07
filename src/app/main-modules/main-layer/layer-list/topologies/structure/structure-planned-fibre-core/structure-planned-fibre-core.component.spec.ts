import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructurePlannedFibreCoreComponent } from './structure-planned-fibre-core.component';

describe('StructurePlannedFibreCoreComponent', () => {
  let component: StructurePlannedFibreCoreComponent;
  let fixture: ComponentFixture<StructurePlannedFibreCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructurePlannedFibreCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructurePlannedFibreCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
