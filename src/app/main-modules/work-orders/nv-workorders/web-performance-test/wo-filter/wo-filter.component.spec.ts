import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoFilterComponent } from './wo-filter.component';

describe('WoFilterComponent', () => {
  let component: WoFilterComponent;
  let fixture: ComponentFixture<WoFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
