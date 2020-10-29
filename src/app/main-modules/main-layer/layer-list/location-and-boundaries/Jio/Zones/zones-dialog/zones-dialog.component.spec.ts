import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonesJioDialogComponent } from './zones-dialog.component';

describe('ZonesJioDialogComponent', () => {
  let component: ZonesJioDialogComponent;
  let fixture: ComponentFixture<ZonesJioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonesJioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonesJioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
