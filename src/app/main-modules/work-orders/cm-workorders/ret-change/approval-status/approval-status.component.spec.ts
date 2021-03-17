import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalStatusComponent } from './approval-status.component';

describe('ApprovalStatusComponent', () => {
  let component: ApprovalStatusComponent;
  let fixture: ComponentFixture<ApprovalStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
