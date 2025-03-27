import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamsungRqaSchedulingComponent } from './samsung-rqa-scheduling.component';

describe('SamsungRqaSchedulingComponent', () => {
  let component: SamsungRqaSchedulingComponent;
  let fixture: ComponentFixture<SamsungRqaSchedulingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamsungRqaSchedulingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamsungRqaSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
