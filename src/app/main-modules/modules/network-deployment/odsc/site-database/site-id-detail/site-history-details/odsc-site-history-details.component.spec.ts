import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteHistoryDetailsComponent } from './site-history-details.component';

describe('SiteHistoryDetailsComponent', () => {
  let component: SiteHistoryDetailsComponent;
  let fixture: ComponentFixture<SiteHistoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteHistoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
