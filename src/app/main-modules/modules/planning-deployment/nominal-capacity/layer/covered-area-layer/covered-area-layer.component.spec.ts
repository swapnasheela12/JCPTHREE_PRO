import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoveredAreaLayerComponent } from './covered-area-layer.component';

describe('CoveredAreaLayerComponent', () => {
  let component: CoveredAreaLayerComponent;
  let fixture: ComponentFixture<CoveredAreaLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoveredAreaLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoveredAreaLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
