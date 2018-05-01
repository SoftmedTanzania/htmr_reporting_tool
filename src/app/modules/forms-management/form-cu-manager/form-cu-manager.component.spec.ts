import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCuManagerComponent } from './form-cu-manager.component';

describe('FormCuManagerComponent', () => {
  let component: FormCuManagerComponent;
  let fixture: ComponentFixture<FormCuManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCuManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCuManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
