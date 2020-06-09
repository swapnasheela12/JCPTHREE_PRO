import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackhaulViolatorsComponent } from './backhaul-violators.component';

describe('BackhaulViolatorsComponent', () => {
  let component: BackhaulViolatorsComponent;
  let fixture: ComponentFixture<BackhaulViolatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackhaulViolatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackhaulViolatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
