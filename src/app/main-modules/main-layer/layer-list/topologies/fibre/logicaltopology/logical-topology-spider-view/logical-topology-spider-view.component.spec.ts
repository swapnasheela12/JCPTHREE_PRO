import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FivegSpiderViewComponent } from './logical-topology-spider-view.component';

describe('LogicalTopologySpiderViewComponent', () => {
  let component: FivegSpiderViewComponent;
  let fixture: ComponentFixture<FivegSpiderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FivegSpiderViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FivegSpiderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
