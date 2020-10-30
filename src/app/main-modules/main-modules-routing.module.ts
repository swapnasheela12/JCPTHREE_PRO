import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyReportsComponent } from './reports-dashboards/my-reports/my-reports.component';
import { ZoomDataComponent } from './reports-dashboards/zoom-data/zoom-data.component';
import { ReportsWizardComponent } from './reports-dashboards/reports-wizard/reports-wizard.component';
import { MainLayerComponent } from './main-layer/main-layer.component';
import { CustomDashboardComponent } from './reports-dashboards/custom-dashboard/custom-dashboard.component';
import { TwampLiveDashboardComponent } from './reports-dashboards/custom-dashboard/twamp-live-dashboard/twamp-live-dashboard.component';
//import { SlaConformanceComponent } from './reports-dashboards/custom-dashboard/sla-conformance/sla-conformance.component';

const routes: Routes = [
  { path: "", component: MainLayerComponent },
  { path: "Report-Wizard", component: ReportsWizardComponent },
  { path: "My-Reports", component: MyReportsComponent },
  {
    path: "Custom-Dashboards", children: [
      { path: "", component: CustomDashboardComponent },
      {
        path: "Custom-Dashboard", children: [
          { path: "Twamp-Live-Dashboard", component: TwampLiveDashboardComponent },
          //  { path:"SLA-Conformance", component: SlaConformanceComponent }
        ]
      }
    ]
  },
  {
    path: "ZoomData-Dashboards", children: [
      { path: "", component: ZoomDataComponent },
      {
        path: "ZoomData-Dashboard", children: [
          { path: "Twamp-Live-Dashboard", component: TwampLiveDashboardComponent },
          // { path:"SLA-Conformance", component: SlaConformanceComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainModulesRoutingModule { }
