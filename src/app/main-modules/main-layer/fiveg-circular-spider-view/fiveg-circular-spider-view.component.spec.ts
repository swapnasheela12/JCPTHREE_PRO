import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FivegCircularSpiderViewComponent } from './fiveg-circular-spider-view.component';

describe('FivegCircularSpiderViewComponent', () => {
  let component: FivegCircularSpiderViewComponent;
  let fixture: ComponentFixture<FivegCircularSpiderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FivegCircularSpiderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FivegCircularSpiderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
