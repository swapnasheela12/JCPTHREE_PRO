import { KpiEditorComponent } from './kpi-editor/kpi-editor.component';
import { ReportBuilderComponent } from './report-builder/report-builder.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WifiUtilityComponent } from './wifi-utility/wifi-utility.component';
import { CreateKpiComponent } from './kpi-editor/create-kpi/create-kpi.component';
// import { CreateReportComponent } from './report-builder/create-report/create-report.component';


const routes: Routes = [
  {
    path: "Report-Builder", children: [
      
      {path: "", component: ReportBuilderComponent},
      // {path: "Create-Report", component: CreateReportComponent},
    ]
  },
  {
    path: "KPI-Editor",
    children: [
      { path: "", component: KpiEditorComponent },
      { path: "Create-KPI", component: CreateKpiComponent }
    ]
  },
  { path:"MSISDN-To-Wi-Fi-MAC-Converter", component: WifiUtilityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceManagementRoutingModule { }
