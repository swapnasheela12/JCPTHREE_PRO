import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyJcpComponent } from './my-jcp.component';

describe('MyJcpComponent', () => {
  let component: MyJcpComponent;
  let fixture: ComponentFixture<MyJcpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyJcpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyJcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
