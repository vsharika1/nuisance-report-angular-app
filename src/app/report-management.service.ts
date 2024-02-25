import { Injectable } from '@angular/core';
import { NuisanceReport } from './models/nuisance-report';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ReportData } from './models/report-data';

@Injectable({
  providedIn: 'root'
})
export class ReportManagementService {
  private locations: string[] = [];

  constructor(private http: HttpClient) {
  }

  updateReport(report: ReportData): Observable<ReportData> {
    const apiUrl = `https://272.selfip.net/apps/lXElfToYzx/collections/Final-Project/documents/${report.key}`;
    return this.http.patch<ReportData>(apiUrl, { data: report.data });
  }

  verifyPassword(password: string): Observable<any> {
    const hash = 'fcab0453879a2b2281bc5073e3f5fe54';
    return this.http.get(`https://api.hashify.net/hash/md5/hex?value=${password}`)
      .pipe(
        map((response: any) => response.Digest === hash)
      );
  }

  deleteReport(reportKey: string): Observable<{}> {
    const apiUrl = `https://272.selfip.net/apps/lXElfToYzx/collections/Final-Project/documents/${reportKey}/`;
    return this.http.delete(apiUrl);
  }

  getAllReports(): Observable<ReportData[]> {
    const apiUrl = 'https://272.selfip.net/apps/lXElfToYzx/collections/Final-Project/documents/';
    return this.http.get<ReportData[]>(apiUrl);
  }

  addReport(report: NuisanceReport): Observable<ReportData> {
    const apiUrl = 'https://272.selfip.net/apps/lXElfToYzx/collections/Final-Project/documents/';
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '');
    const reporterName = report.reportedBy.replace(/\s+/g, '_').toLowerCase();
    const reportKey = `${reporterName}_${timestamp}`;

    const reportData: ReportData = {
      key: reportKey,
      data: report
    }

    return this.http.post<ReportData>(apiUrl, reportData)
  }

  setLocations(locations: string[]): void {
    this.locations = locations;
  }

  getLocations(): string[] {
    return this.locations;
  }
}
