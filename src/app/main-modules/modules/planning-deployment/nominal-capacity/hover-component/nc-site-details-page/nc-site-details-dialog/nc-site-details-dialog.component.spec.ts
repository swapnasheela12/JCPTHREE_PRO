import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcSiteDetailsDialogComponent } from './nc-site-details-dialog.component';

describe('NcSiteDetailsDialogComponent', () => {
  let component: NcSiteDetailsDialogComponent;
  let fixture: ComponentFixture<NcSiteDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcSiteDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcSiteDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
