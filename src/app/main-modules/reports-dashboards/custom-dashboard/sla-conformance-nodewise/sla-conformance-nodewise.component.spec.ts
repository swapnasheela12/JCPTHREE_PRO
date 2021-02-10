import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaConformanceNodewiseComponent } from './sla-conformance-nodewise.component';

describe('SlaConformanceNodewiseComponent', () => {
  let component: SlaConformanceNodewiseComponent;
  let fixture: ComponentFixture<SlaConformanceNodewiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlaConformanceNodewiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaConformanceNodewiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
