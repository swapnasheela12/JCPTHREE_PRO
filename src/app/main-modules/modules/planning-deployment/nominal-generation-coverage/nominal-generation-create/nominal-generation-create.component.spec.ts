import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalGenerationCreateComponent } from './nominal-generation-create.component';

describe('NominalGenerationCreateComponent', () => {
  let component: NominalGenerationCreateComponent;
  let fixture: ComponentFixture<NominalGenerationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalGenerationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalGenerationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
