import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowRenderingComponent } from './row-rendering.component';

describe('RowRenderingComponent', () => {
  let component: RowRenderingComponent;
  let fixture: ComponentFixture<RowRenderingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowRenderingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowRenderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
