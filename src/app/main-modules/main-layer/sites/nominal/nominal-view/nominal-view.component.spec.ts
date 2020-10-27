import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalViewComponent } from './nominal-view.component';

describe('NominalViewComponent', () => {
  let component: NominalViewComponent;
  let fixture: ComponentFixture<NominalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
