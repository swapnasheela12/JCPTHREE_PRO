import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonTemplatesComponent } from './reason-templates.component';

describe('ReasonTemplatesComponent', () => {
  let component: ReasonTemplatesComponent;
  let fixture: ComponentFixture<ReasonTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasonTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
