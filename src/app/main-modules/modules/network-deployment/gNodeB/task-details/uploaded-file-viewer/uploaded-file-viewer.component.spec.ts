import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedFileViewerComponent } from './uploaded-file-viewer.component';

describe('UploadedFileViewerComponent', () => {
  let component: UploadedFileViewerComponent;
  let fixture: ComponentFixture<UploadedFileViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadedFileViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedFileViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
