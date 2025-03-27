import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectFormComponent } from './reject-form.component';

describe('RejectFormComponent', () => {
  let component: RejectFormComponent;
  let fixture: ComponentFixture<RejectFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
