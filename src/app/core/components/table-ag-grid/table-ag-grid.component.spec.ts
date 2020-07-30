import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAgGridComponent } from './table-ag-grid.component';

describe('TableAgGridComponent', () => {
  let component: TableAgGridComponent;
  let fixture: ComponentFixture<TableAgGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAgGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAgGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
