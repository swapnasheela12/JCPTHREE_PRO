import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoldenParameterComponent } from './add-golden-parameter.component';

describe('AddGoldenParameterComponent', () => {
  let component: AddGoldenParameterComponent;
  let fixture: ComponentFixture<AddGoldenParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGoldenParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGoldenParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
