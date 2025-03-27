import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputationSettingsPoupComponent } from './computation-settings-poup.component';

describe('ComputationSettingsPoupComponent', () => {
  let component: ComputationSettingsPoupComponent;
  let fixture: ComponentFixture<ComputationSettingsPoupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputationSettingsPoupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputationSettingsPoupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
