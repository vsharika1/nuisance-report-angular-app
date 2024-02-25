import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportNuisanceFormComponent } from './report-nuisance-form.component';

describe('ReportNuisanceFormComponent', () => {
  let component: ReportNuisanceFormComponent;
  let fixture: ComponentFixture<ReportNuisanceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportNuisanceFormComponent]
    });
    fixture = TestBed.createComponent(ReportNuisanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
