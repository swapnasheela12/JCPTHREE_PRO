import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebPerformanceTestComponent } from './web-performance-test.component';

describe('WebPerformanceTestComponent', () => {
  let component: WebPerformanceTestComponent;
  let fixture: ComponentFixture<WebPerformanceTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebPerformanceTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebPerformanceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
