import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTempleteComponent } from './report-templete.component';

describe('ReportTempleteComponent', () => {
  let component: ReportTempleteComponent;
  let fixture: ComponentFixture<ReportTempleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTempleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTempleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
