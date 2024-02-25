import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportInfoComponent } from '../report-info/report-info.component';
import { Modal } from 'bootstrap';
import { ReportManagementService } from '../report-management.service';
import { ReportData } from '../models/report-data';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  reportData: ReportData[] = [];
  selectedReport?: ReportData;
  @ViewChild(ReportInfoComponent) reportInfoComponent!: ReportInfoComponent;

  constructor(private reportManagementService: ReportManagementService) {}

  ngOnInit(): void {
    this.getAllReports();
  }

  showMoreInfo(report: ReportData): void {
    this.selectedReport = report;
    const infoModalElement = document.getElementById('infoModal');
    if (infoModalElement) {
      const infoModal = new Modal(infoModalElement);
      infoModal.show();
    }
  }

  getAllReports() {
    this.reportManagementService.getAllReports().subscribe(reportData => {
      this.reportData = reportData;
      const uniqueLocations = Array.from(new Set(reportData.map(rd => rd.data.location)));
      this.reportManagementService.setLocations(uniqueLocations);
    });
  }

  deleteReport(reportKey: string): void { 
    const password = prompt('Please enter the password to delete the report:');
    if (password) {
      this.reportManagementService.verifyPassword(password).subscribe(
        isValid => {
          if (isValid) {
            this.reportManagementService.deleteReport(reportKey).subscribe(() => {
              this.getAllReports();
            });
          } else {
            alert('Invalid password.');
          }
        }
      );
    }
  }
}
