import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowTreeGroupTableComponent } from './row-tree-group-table.component';

describe('RowTreeGroupTableComponent', () => {
  let component: RowTreeGroupTableComponent;
  let fixture: ComponentFixture<RowTreeGroupTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowTreeGroupTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowTreeGroupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
