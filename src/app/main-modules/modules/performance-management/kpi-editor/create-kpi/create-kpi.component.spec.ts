import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKpiComponent } from './create-kpi.component';

describe('CreateKpiComponent', () => {
  let component: CreateKpiComponent;
  let fixture: ComponentFixture<CreateKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
