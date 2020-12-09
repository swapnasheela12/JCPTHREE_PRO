import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmlCommandResultComponent } from './mml-command-result.component';

describe('MmlCommandResultComponent', () => {
  let component: MmlCommandResultComponent;
  let fixture: ComponentFixture<MmlCommandResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmlCommandResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmlCommandResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
