import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewWorkorderComponent } from './create-new-workorder.component';

describe('CreateNewWorkorderComponent', () => {
  let component: CreateNewWorkorderComponent;
  let fixture: ComponentFixture<CreateNewWorkorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewWorkorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewWorkorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
