import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusionZonesComponent } from './exclusion-zones.component';

describe('ExclusionZonesComponent', () => {
  let component: ExclusionZonesComponent;
  let fixture: ComponentFixture<ExclusionZonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExclusionZonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusionZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
