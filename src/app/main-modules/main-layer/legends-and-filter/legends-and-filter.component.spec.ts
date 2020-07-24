import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendsAndFilterComponent } from './legends-and-filter.component';

describe('LegendsAndFilterComponent', () => {
  let component: LegendsAndFilterComponent;
  let fixture: ComponentFixture<LegendsAndFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegendsAndFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendsAndFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
