import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeRenderingComponent } from './tree-rendering.component';

describe('TreeRenderingComponent', () => {
  let component: TreeRenderingComponent;
  let fixture: ComponentFixture<TreeRenderingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeRenderingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeRenderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
