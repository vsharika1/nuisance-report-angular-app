export class NuisanceReport {
  baddiesName: string;
  location: string;
  reportedBy: string;
  dateTime: Date;
  reportStatus: 'Resolved' | 'Open' | 'New';
  extraInfo: string;

  constructor(
    baddiesName: string,
    location: string,
    reportedBy: string,
    dateTime: Date,
    reportStatus: 'Resolved' | 'Open' | 'New',
    extraInfo: string
  ) {
    this.baddiesName = baddiesName;
    this.location = location;
    this.reportedBy = reportedBy;
    this.dateTime = dateTime;
    this.reportStatus = reportStatus;
    this.extraInfo = extraInfo;
  }
}
