import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IfElsePopupComponent } from './if-else-popup.component';

describe('IfElsePopupComponent', () => {
  let component: IfElsePopupComponent;
  let fixture: ComponentFixture<IfElsePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IfElsePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IfElsePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
