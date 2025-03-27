import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoOvershootingCellComponent } from './wo-overshooting-cell.component';

describe('WoOvershootingCellComponent', () => {
  let component: WoOvershootingCellComponent;
  let fixture: ComponentFixture<WoOvershootingCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoOvershootingCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoOvershootingCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
