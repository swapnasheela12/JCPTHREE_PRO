import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmsDetailsComponent } from './ems-details.component';

describe('EmsDetailsComponent', () => {
  let component: EmsDetailsComponent;
  let fixture: ComponentFixture<EmsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
