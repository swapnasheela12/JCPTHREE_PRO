import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnbscComponent } from './enbsc.component';

describe('EnbscComponent', () => {
  let component: EnbscComponent;
  let fixture: ComponentFixture<EnbscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnbscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnbscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
