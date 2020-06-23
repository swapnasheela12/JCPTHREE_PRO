import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnGroupTableComponent } from './column-group-table.component';

describe('ColumnGroupTableComponent', () => {
  let component: ColumnGroupTableComponent;
  let fixture: ComponentFixture<ColumnGroupTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnGroupTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnGroupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
