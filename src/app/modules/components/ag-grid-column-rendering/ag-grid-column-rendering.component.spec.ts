import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridColumnRenderingComponent } from './ag-grid-column-rendering.component';

describe('AgGridColumnRenderingComponent', () => {
  let component: AgGridColumnRenderingComponent;
  let fixture: ComponentFixture<AgGridColumnRenderingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridColumnRenderingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridColumnRenderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
