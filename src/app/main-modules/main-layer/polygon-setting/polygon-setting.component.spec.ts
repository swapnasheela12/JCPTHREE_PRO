import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolygonSettingComponent } from './polygon-setting.component';

describe('PolygonSettingComponent', () => {
  let component: PolygonSettingComponent;
  let fixture: ComponentFixture<PolygonSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolygonSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolygonSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
