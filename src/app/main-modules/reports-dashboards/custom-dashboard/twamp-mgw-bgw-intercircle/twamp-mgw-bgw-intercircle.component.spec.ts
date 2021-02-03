import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwampMgwBgwIntercircleComponent } from './twamp-mgw-bgw-intercircle.component';

describe('TwampMgwBgwIntercircleComponent', () => {
  let component: TwampMgwBgwIntercircleComponent;
  let fixture: ComponentFixture<TwampMgwBgwIntercircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwampMgwBgwIntercircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwampMgwBgwIntercircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
