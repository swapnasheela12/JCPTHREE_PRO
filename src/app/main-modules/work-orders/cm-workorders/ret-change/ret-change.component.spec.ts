import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetChangeComponent } from './ret-change.component';

describe('RetChangeComponent', () => {
  let component: RetChangeComponent;
  let fixture: ComponentFixture<RetChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
