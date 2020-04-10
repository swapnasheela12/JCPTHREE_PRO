import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeJcpThreeComponent } from './home-jcp-three.component';

describe('HomeJcpThreeComponent', () => {
  let component: HomeJcpThreeComponent;
  let fixture: ComponentFixture<HomeJcpThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeJcpThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeJcpThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
