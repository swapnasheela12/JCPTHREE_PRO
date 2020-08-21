import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridRowRenderingComponent } from './ag-grid-row-rendering.component';

describe('AgGridRowRenderingComponent', () => {
  let component: AgGridRowRenderingComponent;
  let fixture: ComponentFixture<AgGridRowRenderingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridRowRenderingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridRowRenderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
