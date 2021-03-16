import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectTaskComponent } from './reject-task.component';

describe('RejectTaskComponent', () => {
  let component: RejectTaskComponent;
  let fixture: ComponentFixture<RejectTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
