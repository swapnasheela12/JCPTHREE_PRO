import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEpsGoldenConfComponent } from './create-eps-golden-conf.component';

describe('CreateEpsGoldenConfComponent', () => {
  let component: CreateEpsGoldenConfComponent;
  let fixture: ComponentFixture<CreateEpsGoldenConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEpsGoldenConfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEpsGoldenConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
