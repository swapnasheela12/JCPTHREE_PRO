import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableViewControlComponent } from './table-view-control.component';

describe('TableViewControlComponent', () => {
  let component: TableViewControlComponent;
  let fixture: ComponentFixture<TableViewControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableViewControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableViewControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
