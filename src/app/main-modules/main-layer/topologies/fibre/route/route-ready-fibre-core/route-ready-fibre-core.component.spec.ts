import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteReadyFibreCoreComponent } from './route-ready-fibre-core.component';

describe('RouteReadyFibreCoreComponent', () => {
  let component: RouteReadyFibreCoreComponent;
  let fixture: ComponentFixture<RouteReadyFibreCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteReadyFibreCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteReadyFibreCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
