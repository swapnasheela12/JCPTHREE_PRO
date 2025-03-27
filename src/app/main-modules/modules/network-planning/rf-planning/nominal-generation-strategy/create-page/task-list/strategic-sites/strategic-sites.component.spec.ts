import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategicSitesComponent } from './strategic-sites.component';

describe('StrategicSitesComponent', () => {
  let component: StrategicSitesComponent;
  let fixture: ComponentFixture<StrategicSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrategicSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategicSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
