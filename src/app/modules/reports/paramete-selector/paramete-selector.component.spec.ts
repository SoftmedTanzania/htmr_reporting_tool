import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameteSelectorComponent } from './paramete-selector.component';

describe('ParameteSelectorComponent', () => {
  let component: ParameteSelectorComponent;
  let fixture: ComponentFixture<ParameteSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameteSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameteSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
