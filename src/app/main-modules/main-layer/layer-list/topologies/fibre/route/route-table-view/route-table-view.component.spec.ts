import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteTableViewComponent } from './route-table-view.component';

describe('RouteTableViewComponent', () => {
  let component: RouteTableViewComponent;
  let fixture: ComponentFixture<RouteTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteTableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
