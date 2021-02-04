import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwampInterCircleComponent } from './twamp-inter-circle.component';

describe('TwampInterCircleComponent', () => {
  let component: TwampInterCircleComponent;
  let fixture: ComponentFixture<TwampInterCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwampInterCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwampInterCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
