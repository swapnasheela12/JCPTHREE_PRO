import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCommentWidgetComponent } from './input-comment-widget.component';

describe('InputCommentWidgetComponent', () => {
  let component: InputCommentWidgetComponent;
  let fixture: ComponentFixture<InputCommentWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputCommentWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCommentWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
