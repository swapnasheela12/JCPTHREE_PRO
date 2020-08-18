import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LteAntennaComponent } from './lte-antenna.component';

describe('LteAntennaComponent', () => {
  let component: LteAntennaComponent;
  let fixture: ComponentFixture<LteAntennaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LteAntennaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LteAntennaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
