import { Component, ViewChild} from '@angular/core';
import { Modal } from 'bootstrap';
import { ReportNuisanceFormComponent } from '../report-nuisance-form/report-nuisance-form.component';


@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.css']
})
export class CreateReportComponent {
  @ViewChild(ReportNuisanceFormComponent) reportNuisanceFormComponent!: ReportNuisanceFormComponent;

  createReport(): void {
    const nuisanceReportModalElement = document.getElementById('nuisanceReportModal');
    if (nuisanceReportModalElement) {
      const nuisanceReportModal = new Modal(nuisanceReportModalElement);
      nuisanceReportModal.show();
    }
  }
}
