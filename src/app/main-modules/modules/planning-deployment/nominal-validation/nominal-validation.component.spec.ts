import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalValidationComponent } from './nominal-validation.component';

describe('NominalValidationComponent', () => {
  let component: NominalValidationComponent;
  let fixture: ComponentFixture<NominalValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
