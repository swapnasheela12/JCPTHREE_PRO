import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineDataSourceComponent } from './define-data-source.component';

describe('DefineDataSourceComponent', () => {
  let component: DefineDataSourceComponent;
  let fixture: ComponentFixture<DefineDataSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefineDataSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineDataSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
