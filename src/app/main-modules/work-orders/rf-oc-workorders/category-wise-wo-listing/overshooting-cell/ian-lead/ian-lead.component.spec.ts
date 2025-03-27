import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IanLeadComponent } from './ian-lead.component';

describe('IanLeadComponent', () => {
  let component: IanLeadComponent;
  let fixture: ComponentFixture<IanLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IanLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IanLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
