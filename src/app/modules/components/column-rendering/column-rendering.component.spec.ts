import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnRenderingComponent } from './column-rendering.component';

describe('ColumnRenderingComponent', () => {
  let component: ColumnRenderingComponent;
  let fixture: ComponentFixture<ColumnRenderingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnRenderingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnRenderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
