import { KpiEditorComponent } from './kpi-editor/kpi-editor.component';
import { ReportBuilderComponent } from './report-builder/report-builder.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WifiUtilityComponent } from './wifi-utility/wifi-utility.component';


const routes: Routes = [
  { path: "Report-Builder", component: ReportBuilderComponent },
  { path:"KPI-Editor", component: KpiEditorComponent},
  { path:"MSISDN-To-Wi-Fi-MAC-Converter", component: WifiUtilityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceManagementRoutingModule { }
