import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesACPComponent } from './candidates-acp.component';

describe('CandidatesACPComponent', () => {
  let component: CandidatesACPComponent;
  let fixture: ComponentFixture<CandidatesACPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatesACPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesACPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
