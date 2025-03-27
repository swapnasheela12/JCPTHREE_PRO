import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvershootingCellComponent } from './overshooting-cell.component';

describe('OvershootingCellComponent', () => {
  let component: OvershootingCellComponent;
  let fixture: ComponentFixture<OvershootingCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvershootingCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvershootingCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
