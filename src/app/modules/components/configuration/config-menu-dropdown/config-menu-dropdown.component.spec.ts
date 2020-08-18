import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigMenuDropdownComponent } from './config-menu-dropdown.component';

describe('ConfigMenuDropdownComponent', () => {
  let component: ConfigMenuDropdownComponent;
  let fixture: ComponentFixture<ConfigMenuDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigMenuDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigMenuDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
