import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LayerPatchPopupComponent } from './layer-patch-popup.component';


describe('AdditionalCandidatesPopupComponent', () => {
  let component: LayerPatchPopupComponent;
  let fixture: ComponentFixture<LayerPatchPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerPatchPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerPatchPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
