import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwampNidMeasurementComponent } from './twamp-nid-measurement.component';

describe('TwampNidMeasurementComponent', () => {
  let component: TwampNidMeasurementComponent;
  let fixture: ComponentFixture<TwampNidMeasurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwampNidMeasurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwampNidMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
