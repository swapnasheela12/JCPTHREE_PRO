import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallCellPlannedSpiderViewComponent } from './small-cell-planned-spider-view.component';

describe('SmallCellPlannedSpiderViewComponent', () => {
  let component: SmallCellPlannedSpiderViewComponent;
  let fixture: ComponentFixture<SmallCellPlannedSpiderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallCellPlannedSpiderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallCellPlannedSpiderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
