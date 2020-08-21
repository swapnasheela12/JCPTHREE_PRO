import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldenParameterComponent } from './golden-parameter.component';

describe('GoldenParameterComponent', () => {
  let component: GoldenParameterComponent;
  let fixture: ComponentFixture<GoldenParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoldenParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldenParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
