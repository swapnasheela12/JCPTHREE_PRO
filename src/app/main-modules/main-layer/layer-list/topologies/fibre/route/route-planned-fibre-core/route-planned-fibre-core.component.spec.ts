import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutePlannedFibreCoreComponent } from './route-planned-fibre-core.component';

describe('RoutePlannedFibreCoreComponent', () => {
  let component: RoutePlannedFibreCoreComponent;
  let fixture: ComponentFixture<RoutePlannedFibreCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutePlannedFibreCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutePlannedFibreCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
