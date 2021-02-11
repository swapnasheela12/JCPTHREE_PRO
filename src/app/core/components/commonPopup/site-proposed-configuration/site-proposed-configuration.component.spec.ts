import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteProposedConfigurationComponent } from './site-proposed-configuration.component';

describe('SiteProposedConfigurationComponent', () => {
  let component: SiteProposedConfigurationComponent;
  let fixture: ComponentFixture<SiteProposedConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteProposedConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteProposedConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
