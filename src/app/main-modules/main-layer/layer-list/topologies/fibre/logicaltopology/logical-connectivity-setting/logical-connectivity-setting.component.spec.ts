import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicalConnectivitySettingComponent } from './logical-connectivity-setting.component';

describe('LogicalConnectivitySettingComponent', () => {
  let component: LogicalConnectivitySettingComponent;
  let fixture: ComponentFixture<LogicalConnectivitySettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicalConnectivitySettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicalConnectivitySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
