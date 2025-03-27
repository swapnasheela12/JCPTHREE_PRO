import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyjcpdropdownpanelComponent } from './myjcpdropdownpanel.component';

describe('MyjcpdropdownpanelComponent', () => {
  let component: MyjcpdropdownpanelComponent;
  let fixture: ComponentFixture<MyjcpdropdownpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyjcpdropdownpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyjcpdropdownpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
