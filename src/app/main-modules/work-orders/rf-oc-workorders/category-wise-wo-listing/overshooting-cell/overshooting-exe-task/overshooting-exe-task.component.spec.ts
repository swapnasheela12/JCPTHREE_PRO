import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvershootingExeTaskComponent } from './overshooting-exe-task.component';

describe('OvershootingExeTaskComponent', () => {
  let component: OvershootingExeTaskComponent;
  let fixture: ComponentFixture<OvershootingExeTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvershootingExeTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvershootingExeTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
