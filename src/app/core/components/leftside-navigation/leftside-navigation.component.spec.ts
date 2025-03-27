import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftsideNavigationComponent } from './leftside-navigation.component';

describe('LeftsideNavigationComponent', () => {
  let component: LeftsideNavigationComponent;
  let fixture: ComponentFixture<LeftsideNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftsideNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftsideNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
