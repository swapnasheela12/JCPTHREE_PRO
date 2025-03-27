import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalValidationAdditionallayerComponent } from './nominal-validation-additionallayer.component';

describe('NominalValidationAdditionallayerComponent', () => {
  let component: NominalValidationAdditionallayerComponent;
  let fixture: ComponentFixture<NominalValidationAdditionallayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalValidationAdditionallayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalValidationAdditionallayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
