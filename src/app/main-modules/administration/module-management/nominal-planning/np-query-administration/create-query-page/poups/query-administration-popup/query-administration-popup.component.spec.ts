import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryAdministrationPopupComponent } from './query-administration-popup.component';

describe('QueryAdministrationPopupComponent', () => {
  let component: QueryAdministrationPopupComponent;
  let fixture: ComponentFixture<QueryAdministrationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryAdministrationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryAdministrationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
