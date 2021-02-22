import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcQueryAdministrationComponent } from './nc-query-administration.component';

describe('NcQueryAdministrationComponent', () => {
  let component: NcQueryAdministrationComponent;
  let fixture: ComponentFixture<NcQueryAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcQueryAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcQueryAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
