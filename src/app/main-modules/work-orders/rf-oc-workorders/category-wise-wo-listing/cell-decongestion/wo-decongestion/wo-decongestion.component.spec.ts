import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoDecongestionComponent } from './wo-decongestion.component';

describe('WoDecongestionComponent', () => {
  let component: WoDecongestionComponent;
  let fixture: ComponentFixture<WoDecongestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoDecongestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoDecongestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
