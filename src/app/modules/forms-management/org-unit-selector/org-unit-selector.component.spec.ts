import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgUnitSelectorComponent } from './org-unit-selector.component';

describe('OrgUnitSelectorComponent', () => {
  let component: OrgUnitSelectorComponent;
  let fixture: ComponentFixture<OrgUnitSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgUnitSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgUnitSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
