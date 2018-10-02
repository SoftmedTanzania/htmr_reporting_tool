import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefferalReportComponent } from './refferal-report.component';

describe('RefferalReportComponent', () => {
  let component: RefferalReportComponent;
  let fixture: ComponentFixture<RefferalReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefferalReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefferalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
