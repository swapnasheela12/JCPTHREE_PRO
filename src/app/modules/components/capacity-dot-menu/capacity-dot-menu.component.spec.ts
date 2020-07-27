import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityDotMenuComponent } from './capacity-dot-menu.component';

describe('CapacityDotMenuComponent', () => {
  let component: CapacityDotMenuComponent;
  let fixture: ComponentFixture<CapacityDotMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapacityDotMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacityDotMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
