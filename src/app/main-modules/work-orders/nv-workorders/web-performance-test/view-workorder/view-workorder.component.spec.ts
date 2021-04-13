import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWorkorderComponent } from './view-workorder.component';

describe('ViewWorkorderComponent', () => {
  let component: ViewWorkorderComponent;
  let fixture: ComponentFixture<ViewWorkorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewWorkorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWorkorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
