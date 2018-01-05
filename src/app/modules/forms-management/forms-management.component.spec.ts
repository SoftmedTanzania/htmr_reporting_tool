import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsManagementComponent } from './forms-management.component';

describe('FormsManagementComponent', () => {
  let component: FormsManagementComponent;
  let fixture: ComponentFixture<FormsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
