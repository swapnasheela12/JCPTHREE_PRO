import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenseUrbanDialogComponent } from './dense-urban-dialog.component';

describe('DenseUrbanDialogComponent', () => {
  let component: DenseUrbanDialogComponent;
  let fixture: ComponentFixture<DenseUrbanDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenseUrbanDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenseUrbanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
