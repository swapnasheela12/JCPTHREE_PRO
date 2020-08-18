import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographicalDetailsComponent } from './geographical-details.component';

describe('GeographicalDetailsComponent', () => {
  let component: GeographicalDetailsComponent;
  let fixture: ComponentFixture<GeographicalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeographicalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeographicalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
