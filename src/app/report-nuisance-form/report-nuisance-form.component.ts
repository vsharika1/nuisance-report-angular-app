import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportManagementService } from '../report-management.service';

@Component({
  selector: 'app-report-nuisance-form',
  templateUrl: './report-nuisance-form.component.html',
  styleUrls: ['./report-nuisance-form.component.css']
})
export class ReportNuisanceFormComponent implements OnInit {
  nuisanceReportForm: FormGroup;
  locations: string[] = [];
  filteredLocations: string[] = [];
  selectedLocation: string = '';
  newLocation: string = '';

  constructor(private fb: FormBuilder, private reportManagementService: ReportManagementService) {
    this.nuisanceReportForm = this.fb.group({
      baddiesName: ['', Validators.required],
      location: ['', Validators.required],
      reportedBy: ['', Validators.required],
      dateTime: ['', Validators.required],
      reportStatus: [{value: 'New', disabled: true }],
      extraInfo: ['']
    });
  }

  ngOnInit(): void {
    this.fetchLocations();
  }

  addReport(): void {
    if (this.nuisanceReportForm.valid) {
      const formValues = this.nuisanceReportForm.value;
      formValues.dateTime = new Date(formValues.dateTime);
      formValues.reportStatus = 'New';

      if (formValues.location && !this.locations.includes(formValues.location)) {
        this.locations.push(formValues.location); 
      }

      this.reportManagementService.addReport(formValues).subscribe({
        next: (response) => {
          console.log('Report saved successfully:', response);
          this.nuisanceReportForm.reset({
            location: '', 
            reportStatus: {value: 'New', disabled: true} 
          });
        },
        error: (error) => {
          console.error('Failed to save the report:', error);
        }
      });
    }
  }

  fetchLocations(): void {
    this.reportManagementService.getAllReports().subscribe(reportData => {
      const uniqueLocations = Array.from(new Set(reportData.map(rd => rd.data.location)));
      this.locations = uniqueLocations;
    });
  }
}
