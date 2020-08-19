import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BbuComponent } from './bbu.component';

describe('BbuComponent', () => {
  let component: BbuComponent;
  let fixture: ComponentFixture<BbuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BbuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BbuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
