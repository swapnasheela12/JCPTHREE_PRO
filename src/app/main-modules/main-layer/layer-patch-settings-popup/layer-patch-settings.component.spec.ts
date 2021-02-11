import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LayerPatchSettingsPopupComponent } from './layer-patch-settings.component';


describe('LayerPatchSettingsPopupComponent', () => {
  let component: LayerPatchSettingsPopupComponent;
  let fixture: ComponentFixture<LayerPatchSettingsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerPatchSettingsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerPatchSettingsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
