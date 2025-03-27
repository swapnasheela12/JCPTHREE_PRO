import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioParameterComponent } from './radio-parameter.component';

describe('RadioParameterComponent', () => {
  let component: RadioParameterComponent;
  let fixture: ComponentFixture<RadioParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
