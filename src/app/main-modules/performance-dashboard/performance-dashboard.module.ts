import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerformanceDashboardRoutingModule } from './performance-dashboard-routing.module';
import { ReportBuilderComponent } from './report-builder/report-builder.component';


@NgModule({
  declarations: [ReportBuilderComponent],
  imports: [
    CommonModule,
    PerformanceDashboardRoutingModule
  ]
})
export class PerformanceDashboardModule { }
