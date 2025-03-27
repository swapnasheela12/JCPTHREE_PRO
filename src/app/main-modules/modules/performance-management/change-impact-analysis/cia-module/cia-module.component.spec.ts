import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiaModuleComponent } from './cia-module.component';

describe('CiaModuleComponent', () => {
  let component: CiaModuleComponent;
  let fixture: ComponentFixture<CiaModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiaModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiaModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
