import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedRejectionWidgetComponent } from './saved-rejection-widget.component';

describe('SavedRejectionWidgetComponent', () => {
  let component: SavedRejectionWidgetComponent;
  let fixture: ComponentFixture<SavedRejectionWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedRejectionWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedRejectionWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
