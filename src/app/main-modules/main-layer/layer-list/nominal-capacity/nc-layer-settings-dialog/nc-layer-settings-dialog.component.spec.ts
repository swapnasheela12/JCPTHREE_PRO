import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcLayerSettingsDialogComponent } from './nc-layer-settings-dialog.component';

describe('NcLayerSettingsDialogComponent', () => {
  let component: NcLayerSettingsDialogComponent;
  let fixture: ComponentFixture<NcLayerSettingsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcLayerSettingsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcLayerSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
