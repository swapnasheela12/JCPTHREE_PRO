import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WifiUtilityComponent } from './wifi-utility.component';

describe('WifiUtilityComponent', () => {
  let component: WifiUtilityComponent;
  let fixture: ComponentFixture<WifiUtilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WifiUtilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WifiUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
