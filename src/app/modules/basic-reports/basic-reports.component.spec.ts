import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicReportsComponent } from './basic-reports.component';

describe('BasicReportsComponent', () => {
  let component: BasicReportsComponent;
  let fixture: ComponentFixture<BasicReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
