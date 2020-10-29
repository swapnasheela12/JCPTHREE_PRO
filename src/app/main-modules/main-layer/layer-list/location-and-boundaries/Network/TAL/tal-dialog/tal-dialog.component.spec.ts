import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacNetworkDialogComponent } from './tal-dialog.component';

describe('TacNetworkDialogComponent', () => {
  let component: TacNetworkDialogComponent;
  let fixture: ComponentFixture<TacNetworkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacNetworkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacNetworkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
