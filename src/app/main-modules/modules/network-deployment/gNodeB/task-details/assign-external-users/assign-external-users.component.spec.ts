import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignExternalUsersComponent } from './assign-external-users.component';

describe('AssignExternalUsersComponent', () => {
  let component: AssignExternalUsersComponent;
  let fixture: ComponentFixture<AssignExternalUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignExternalUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignExternalUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
