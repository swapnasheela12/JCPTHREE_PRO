import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicaltopologyMultiSpiderViewComponent } from './logicaltopology-multi-spider-view.component';

describe('LogicaltopologyMultiSpiderViewComponent', () => {
  let component: LogicaltopologyMultiSpiderViewComponent;
  let fixture: ComponentFixture<LogicaltopologyMultiSpiderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicaltopologyMultiSpiderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicaltopologyMultiSpiderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
