import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkBudgetComponent } from './link-budget.component';

describe('LinkBudgetComponent', () => {
  let component: LinkBudgetComponent;
  let fixture: ComponentFixture<LinkBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
