import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpsGoldenConfComponent } from './eps-golden-conf.component';

describe('EpsGoldenConfComponent', () => {
  let component: EpsGoldenConfComponent;
  let fixture: ComponentFixture<EpsGoldenConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpsGoldenConfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpsGoldenConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
