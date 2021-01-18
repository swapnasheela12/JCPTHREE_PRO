import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectLayersPopupComponent } from './redirect-layers-popup.component';

describe('RedirectLayersPopupComponent', () => {
  let component: RedirectLayersPopupComponent;
  let fixture: ComponentFixture<RedirectLayersPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectLayersPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectLayersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
