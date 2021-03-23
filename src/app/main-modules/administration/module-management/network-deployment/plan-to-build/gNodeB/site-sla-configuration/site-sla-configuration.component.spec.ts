import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSlaConfigurationComponent } from './site-sla-configuration.component';

describe('SiteSlaConfigurationComponent', () => {
  let component: SiteSlaConfigurationComponent;
  let fixture: ComponentFixture<SiteSlaConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteSlaConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSlaConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
