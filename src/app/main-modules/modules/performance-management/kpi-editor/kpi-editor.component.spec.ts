import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiEditorComponent } from './kpi-editor.component';

describe('KpiEditorComponent', () => {
  let component: KpiEditorComponent;
  let fixture: ComponentFixture<KpiEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
