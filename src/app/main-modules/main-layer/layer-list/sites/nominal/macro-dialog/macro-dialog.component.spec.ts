import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalMacroDialogComponent } from './macro-dialog.component';

describe('NominalMacroDialogComponent', () => {
  let component: NominalMacroDialogComponent;
  let fixture: ComponentFixture<NominalMacroDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalMacroDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalMacroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
