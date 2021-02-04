import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSlaConfigurationComponent } from './edit-sla-configuration.component';

describe('EditSlaConfigurationComponent', () => {
  let component: EditSlaConfigurationComponent;
  let fixture: ComponentFixture<EditSlaConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSlaConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSlaConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
