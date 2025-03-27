import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeilingPopupComponent } from './ceiling-popup.component';

describe('CeilingPopupComponent', () => {
  let component: CeilingPopupComponent;
  let fixture: ComponentFixture<CeilingPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeilingPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeilingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
