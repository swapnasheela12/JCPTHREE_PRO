import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyReportsComponent } from './reports-dashboards/my-reports/my-reports.component';
import { ReportsWizardComponent } from './reports-dashboards/reports-wizard/reports-wizard.component';
import { MainLayerComponent } from './main-layer/main-layer.component';
import { KpiEditorComponent } from './modules/performance-management/kpi-editor/kpi-editor.component';


const routes: Routes = [
  { path:"",component:MainLayerComponent },
  { path:"Report-Wizard",component:ReportsWizardComponent },
  { path:"My-Reports",component:MyReportsComponent },
  { path:"KPI-Editor", component: KpiEditorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainModulesRoutingModule { }
