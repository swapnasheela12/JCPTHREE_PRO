import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackhaulComponent } from './backhaul.component';

describe('BackhaulComponent', () => {
  let component: BackhaulComponent;
  let fixture: ComponentFixture<BackhaulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackhaulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackhaulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
