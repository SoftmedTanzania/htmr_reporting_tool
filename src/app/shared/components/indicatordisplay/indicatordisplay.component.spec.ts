import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatordisplayComponent } from './indicatordisplay.component';

describe('IndicatordisplayComponent', () => {
  let component: IndicatordisplayComponent;
  let fixture: ComponentFixture<IndicatordisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatordisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatordisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
