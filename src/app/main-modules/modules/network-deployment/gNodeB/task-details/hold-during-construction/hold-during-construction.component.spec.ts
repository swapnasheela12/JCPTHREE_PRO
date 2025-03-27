import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldDuringConstructionComponent } from './hold-during-construction.component';

describe('HoldDuringConstructionComponent', () => {
  let component: HoldDuringConstructionComponent;
  let fixture: ComponentFixture<HoldDuringConstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldDuringConstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldDuringConstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
