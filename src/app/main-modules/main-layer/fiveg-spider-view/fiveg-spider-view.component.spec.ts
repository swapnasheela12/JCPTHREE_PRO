import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FivegSpiderViewComponent } from './fiveg-spider-view.component';

describe('FivegSpiderViewComponent', () => {
  let component: FivegSpiderViewComponent;
  let fixture: ComponentFixture<FivegSpiderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FivegSpiderViewComponent ]
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
