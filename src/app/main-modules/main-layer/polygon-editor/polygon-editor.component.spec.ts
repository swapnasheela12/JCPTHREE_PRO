import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolygonEditorComponent } from './polygon-editor.component';

describe('PolygonEditorComponent', () => {
  let component: PolygonEditorComponent;
  let fixture: ComponentFixture<PolygonEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolygonEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolygonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
