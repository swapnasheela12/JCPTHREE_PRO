import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldSiteComponent } from './hold-site.component';

describe('HoldSiteComponent', () => {
  let component: HoldSiteComponent;
  let fixture: ComponentFixture<HoldSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
