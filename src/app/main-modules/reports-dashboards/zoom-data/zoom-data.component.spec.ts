import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomDataComponent } from './zoom-data.component';

describe('ZoomDataComponent', () => {
  let component: ZoomDataComponent;
  let fixture: ComponentFixture<ZoomDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
