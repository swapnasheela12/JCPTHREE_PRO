import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpliterViewComponent } from './spliter-view.component';

describe('SpliterViewComponent', () => {
  let component: SpliterViewComponent;
  let fixture: ComponentFixture<SpliterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpliterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpliterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
