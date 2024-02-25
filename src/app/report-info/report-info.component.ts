import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NuisanceReport } from '../models/nuisance-report';
import { ReportManagementService } from '../report-management.service';
import { ReportData } from '../models/report-data';

@Component({
  selector: 'app-report-info',
  templateUrl: './report-info.component.html',
  styleUrls: ['./report-info.component.css']
})
export class ReportInfoComponent {
  @Input() selectedReport?: ReportData;
  @Output() statusChanged = new EventEmitter<NuisanceReport>();
  
  constructor(private reportManagementService: ReportManagementService) {}

  changeStatus(report: ReportData): void {
    const password = prompt('Please enter the password to change status:');
    if (password) {
      this.reportManagementService.verifyPassword(password).subscribe(
        isValid => {
          if (isValid) {
            const newStatus = report.data.reportStatus === 'Open' ? 'Resolved' : 'Open';
            report.data.reportStatus = newStatus; 
          } else {
            alert('Invalid password.');
          }
        }
      );
    }
  }
}
