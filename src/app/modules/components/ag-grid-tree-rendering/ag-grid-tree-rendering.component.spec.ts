import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridTreeRenderingComponent } from './ag-grid-tree-rendering.component';

describe('AgGridTreeRenderingComponent', () => {
  let component: AgGridTreeRenderingComponent;
  let fixture: ComponentFixture<AgGridTreeRenderingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridTreeRenderingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridTreeRenderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
