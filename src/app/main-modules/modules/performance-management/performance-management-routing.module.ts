import { KpiEditorComponent } from './kpi-editor/kpi-editor.component';
import { ReportBuilderComponent } from './report-builder/report-builder.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WifiUtilityComponent } from './wifi-utility/wifi-utility.component';
import { CreateKpiComponent } from './kpi-editor/create-kpi/create-kpi.component';
import { CreateReportComponent } from './report-builder/create-report/create-report.component';
import { CiaModuleComponent } from './change-impact-analysis/cia-module/cia-module.component';
import { CiaKpiSettingsComponent } from './change-impact-analysis/cia-kpi-settings/cia-kpi-settings.component';
import { CiaKpiAdminSettingsComponent } from './change-impact-analysis/cia-kpi-admin-settings/cia-kpi-admin-settings.component';


const routes: Routes = [
  {
    path: "Report-Builder", children: [
      
      {path: "", component: ReportBuilderComponent},
      {path: "Create-Report", component: CreateReportComponent},
    ]
  },
  {
    path: "KPI-Editor",
    children: [
      { path: "", component: KpiEditorComponent },
      { path: "Create-KPI", component: CreateKpiComponent }
    ]
  },
  { path:"MSISDN-To-Wi-Fi-MAC-Converter", component: WifiUtilityComponent },
  {
    path: "Change-Impact-Analysis", children: [
      { path: "CIA-Module",component: CiaModuleComponent },
      { path: "CIA-KPI-Settings", component: CiaKpiSettingsComponent },
      { path: "CIA-KPI-Admin-Settings", component: CiaKpiAdminSettingsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceManagementRoutingModule { }
