import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPerformanceReportsComponent } from './my-performance-reports.component';

describe('MyPerformanceReportsComponent', () => {
  let component: MyPerformanceReportsComponent;
  let fixture: ComponentFixture<MyPerformanceReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPerformanceReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPerformanceReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
