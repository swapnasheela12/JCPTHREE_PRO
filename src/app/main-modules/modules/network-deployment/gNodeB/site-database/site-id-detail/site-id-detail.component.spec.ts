import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteIdDetailComponent } from './site-id-detail.component';

describe('SiteIdDetailComponent', () => {
  let component: SiteIdDetailComponent;
  let fixture: ComponentFixture<SiteIdDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteIdDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteIdDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
