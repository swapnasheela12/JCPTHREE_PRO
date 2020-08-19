import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLegendsComponent } from './custom-legends.component';

describe('CustomLegendsComponent', () => {
  let component: CustomLegendsComponent;
  let fixture: ComponentFixture<CustomLegendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomLegendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomLegendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
