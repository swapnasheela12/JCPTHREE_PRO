import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WptModalComponent } from './wpt-modal.component';

describe('WptModalComponent', () => {
  let component: WptModalComponent;
  let fixture: ComponentFixture<WptModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WptModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WptModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
