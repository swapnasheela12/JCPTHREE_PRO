import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportKmlComponent } from './import-kml.component';

describe('ImportKmlComponent', () => {
  let component: ImportKmlComponent;
  let fixture: ComponentFixture<ImportKmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportKmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportKmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
