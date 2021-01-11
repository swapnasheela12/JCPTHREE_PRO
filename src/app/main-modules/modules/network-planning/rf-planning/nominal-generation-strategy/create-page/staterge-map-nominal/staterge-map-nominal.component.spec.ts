import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatergeMapNominalComponent } from './staterge-map-nominal.component';

describe('StatergeMapNominalComponent', () => {
  let component: StatergeMapNominalComponent;
  let fixture: ComponentFixture<StatergeMapNominalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatergeMapNominalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatergeMapNominalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
