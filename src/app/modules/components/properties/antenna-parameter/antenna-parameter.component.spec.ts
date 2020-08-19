import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntennaParameterComponent } from './antenna-parameter.component';

describe('AntennaParameterComponent', () => {
  let component: AntennaParameterComponent;
  let fixture: ComponentFixture<AntennaParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntennaParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntennaParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
