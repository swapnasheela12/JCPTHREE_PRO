import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreateWoComponent } from './edit-create-wo.component';

describe('EditCreateWoComponent', () => {
  let component: EditCreateWoComponent;
  let fixture: ComponentFixture<EditCreateWoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCreateWoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCreateWoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
