import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpiconComponent } from './helpicon.component';

describe('HelpiconComponent', () => {
  let component: HelpiconComponent;
  let fixture: ComponentFixture<HelpiconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpiconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
