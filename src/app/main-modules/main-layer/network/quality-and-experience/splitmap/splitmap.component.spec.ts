/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SplitmapComponent } from './splitmap.component';

describe('SplitmapComponent', () => {
  let component: SplitmapComponent;
  let fixture: ComponentFixture<SplitmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
