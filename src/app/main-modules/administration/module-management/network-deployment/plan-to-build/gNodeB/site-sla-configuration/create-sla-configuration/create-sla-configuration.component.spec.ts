import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSlaConfigurationComponent } from './create-sla-configuration.component';

describe('CreateSlaConfigurationComponent', () => {
  let component: CreateSlaConfigurationComponent;
  let fixture: ComponentFixture<CreateSlaConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSlaConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSlaConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
