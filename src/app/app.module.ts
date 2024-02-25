import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { DataTableComponent } from './data-table/data-table.component';
import { ReportInfoComponent } from './report-info/report-info.component';
import { CreateReportComponent } from './create-report/create-report.component';
import { ReportNuisanceFormComponent } from './report-nuisance-form/report-nuisance-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    DataTableComponent,
    ReportInfoComponent,
    CreateReportComponent,
    ReportNuisanceFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
