import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorMisalignmentComponent } from './sector-misalignment.component';

describe('SectorMisalignmentComponent', () => {
  let component: SectorMisalignmentComponent;
  let fixture: ComponentFixture<SectorMisalignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorMisalignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorMisalignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
