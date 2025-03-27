import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigDotmenuComponent } from './config-dotmenu.component';

describe('ConfigDotmenuComponent', () => {
  let component: ConfigDotmenuComponent;
  let fixture: ComponentFixture<ConfigDotmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigDotmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigDotmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
