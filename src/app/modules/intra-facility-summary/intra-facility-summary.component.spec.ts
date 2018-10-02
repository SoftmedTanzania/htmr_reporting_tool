import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraFacilitySummaryComponent } from './intra-facility-summary.component';

describe('IntraFacilitySummaryComponent', () => {
  let component: IntraFacilitySummaryComponent;
  let fixture: ComponentFixture<IntraFacilitySummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntraFacilitySummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntraFacilitySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
