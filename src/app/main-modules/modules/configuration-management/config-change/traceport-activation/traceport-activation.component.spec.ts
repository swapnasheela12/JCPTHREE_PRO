import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceportActivationComponent } from './traceport-activation.component';

describe('TraceportActivationComponent', () => {
  let component: TraceportActivationComponent;
  let fixture: ComponentFixture<TraceportActivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraceportActivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraceportActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
