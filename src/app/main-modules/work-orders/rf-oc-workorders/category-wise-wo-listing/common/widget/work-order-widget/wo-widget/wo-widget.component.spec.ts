import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoWidgetComponent } from './wo-widget.component';

describe('WoWidgetComponent', () => {
  let component: WoWidgetComponent;
  let fixture: ComponentFixture<WoWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
