import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionTaskComponent } from './execution-task.component';

describe('ExecutionTaskComponent', () => {
  let component: ExecutionTaskComponent;
  let fixture: ComponentFixture<ExecutionTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutionTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
