import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDatabaseComponent } from './site-database.component';

describe('SiteDatabaseComponent', () => {
  let component: SiteDatabaseComponent;
  let fixture: ComponentFixture<SiteDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
