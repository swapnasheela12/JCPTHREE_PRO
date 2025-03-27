import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TownBoundaryDialogComponent } from './town-boundary-dialog.component';

describe('TownBoundaryDialogComponent', () => {
  let component: TownBoundaryDialogComponent;
  let fixture: ComponentFixture<TownBoundaryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TownBoundaryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TownBoundaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
