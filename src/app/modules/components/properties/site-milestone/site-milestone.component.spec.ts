import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMilestoneComponent } from './site-milestone.component';

describe('SiteMilestoneComponent', () => {
  let component: SiteMilestoneComponent;
  let fixture: ComponentFixture<SiteMilestoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteMilestoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
