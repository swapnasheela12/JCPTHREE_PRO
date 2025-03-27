import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntSerialNumberComponent } from './ont-serial-number.component';

describe('OntSerialNumberComponent', () => {
  let component: OntSerialNumberComponent;
  let fixture: ComponentFixture<OntSerialNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntSerialNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntSerialNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
