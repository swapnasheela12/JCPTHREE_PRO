import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoSectorMisalignmentComponent } from './wo-sector-misalignment.component';

describe('WoSectorMisalignmentComponent', () => {
  let component: WoSectorMisalignmentComponent;
  let fixture: ComponentFixture<WoSectorMisalignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoSectorMisalignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoSectorMisalignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
