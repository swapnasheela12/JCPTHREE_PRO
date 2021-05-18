import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGoldenConfigComponent } from './edit-golden-config.component';

describe('EditGoldenConfigComponent', () => {
  let component: EditGoldenConfigComponent;
  let fixture: ComponentFixture<EditGoldenConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGoldenConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGoldenConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
