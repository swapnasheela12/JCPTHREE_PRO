import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginJcpThreeComponent } from './login-jcp-three.component';

describe('LoginJcpThreeComponent', () => {
  let component: LoginJcpThreeComponent;
  let fixture: ComponentFixture<LoginJcpThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginJcpThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginJcpThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
