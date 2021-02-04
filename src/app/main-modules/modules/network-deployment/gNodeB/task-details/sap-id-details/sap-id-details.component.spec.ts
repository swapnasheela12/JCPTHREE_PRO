import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SapIdDetailsComponent } from './sap-id-details.component';

describe('SapIdDetailsComponent', () => {
  let component: SapIdDetailsComponent;
  let fixture: ComponentFixture<SapIdDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SapIdDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SapIdDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
