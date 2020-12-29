import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FivegAdjacentSpiderViewComponent } from './fiveg-adjacent-spider-view.component';

describe('FivegAdjacentSpiderViewComponent', () => {
  let component: FivegAdjacentSpiderViewComponent;
  let fixture: ComponentFixture<FivegAdjacentSpiderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FivegAdjacentSpiderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FivegAdjacentSpiderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
