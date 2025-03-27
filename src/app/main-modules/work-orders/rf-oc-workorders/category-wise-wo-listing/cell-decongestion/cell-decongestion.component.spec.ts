import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellDecongestionComponent } from './cell-decongestion.component';

describe('CellDecongestionComponent', () => {
  let component: CellDecongestionComponent;
  let fixture: ComponentFixture<CellDecongestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CellDecongestionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellDecongestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
