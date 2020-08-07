import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteParameterComponent } from './site-parameter.component';

describe('SiteParameterComponent', () => {
  let component: SiteParameterComponent;
  let fixture: ComponentFixture<SiteParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
