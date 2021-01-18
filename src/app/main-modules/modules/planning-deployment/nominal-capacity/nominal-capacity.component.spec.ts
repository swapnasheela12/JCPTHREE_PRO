import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalCapacityComponent } from './nominal-capacity.component';

describe('NominalCapacityComponent', () => {
  let component: NominalCapacityComponent;
  let fixture: ComponentFixture<NominalCapacityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalCapacityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
