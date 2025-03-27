import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoAssignmentComponent } from './wo-assignment.component';

describe('WoAssignmentComponent', () => {
  let component: WoAssignmentComponent;
  let fixture: ComponentFixture<WoAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
