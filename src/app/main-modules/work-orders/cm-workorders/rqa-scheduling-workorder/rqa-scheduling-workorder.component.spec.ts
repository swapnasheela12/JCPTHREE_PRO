import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RqaSchedulingWorkorderComponent } from './rqa-scheduling-workorder.component';

describe('RqaSchedulingWorkorderComponent', () => {
  let component: RqaSchedulingWorkorderComponent;
  let fixture: ComponentFixture<RqaSchedulingWorkorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RqaSchedulingWorkorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RqaSchedulingWorkorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
