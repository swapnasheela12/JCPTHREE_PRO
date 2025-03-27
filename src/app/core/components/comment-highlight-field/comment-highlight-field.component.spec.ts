import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentHighlightFieldComponent } from './comment-highlight-field.component';

describe('CommentHighlightFieldComponent', () => {
  let component: CommentHighlightFieldComponent;
  let fixture: ComponentFixture<CommentHighlightFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentHighlightFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentHighlightFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
