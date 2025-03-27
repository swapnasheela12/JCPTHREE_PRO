import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiderViewComponent } from './spider-view.component';

describe('SpiderViewComponent', () => {
  let component: SpiderViewComponent;
  let fixture: ComponentFixture<SpiderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpiderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpiderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
