import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenshotPreviewComponent } from './screenshot-preview.component';

describe('ScreenshotPreviewComponent', () => {
  let component: ScreenshotPreviewComponent;
  let fixture: ComponentFixture<ScreenshotPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenshotPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenshotPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
