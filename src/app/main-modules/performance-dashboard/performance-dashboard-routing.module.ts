import { ReportBuilderComponent } from './report-builder/report-builder.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: "Report-Builder", component: ReportBuilderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceDashboardRoutingModule { }
