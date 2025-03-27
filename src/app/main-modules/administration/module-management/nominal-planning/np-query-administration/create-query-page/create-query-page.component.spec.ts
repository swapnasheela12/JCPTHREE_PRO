import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQueryPageComponent } from './create-query-page.component';

describe('CreateQueryPageComponent', () => {
  let component: CreateQueryPageComponent;
  let fixture: ComponentFixture<CreateQueryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQueryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQueryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
