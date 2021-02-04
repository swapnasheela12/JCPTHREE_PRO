import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaConformanceComponent } from './sla-conformance.component';

describe('SlaConformanceComponent', () => {
  let component: SlaConformanceComponent;
  let fixture: ComponentFixture<SlaConformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlaConformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaConformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
