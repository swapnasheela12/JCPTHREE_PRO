import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalValidationCreateComponent } from './nominal-validation-create.component';

describe('NominalValidationCreateComponent', () => {
  let component: NominalValidationCreateComponent;
  let fixture: ComponentFixture<NominalValidationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalValidationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalValidationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
