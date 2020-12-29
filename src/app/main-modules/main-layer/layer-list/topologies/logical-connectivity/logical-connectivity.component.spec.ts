import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicalConnectivityComponent } from './logical-connectivity.component';

describe('LogicalConnectivityComponent', () => {
  let component: LogicalConnectivityComponent;
  let fixture: ComponentFixture<LogicalConnectivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicalConnectivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicalConnectivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
