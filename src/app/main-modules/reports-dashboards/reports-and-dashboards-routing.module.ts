import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomDashboardComponent } from './custom-dashboard/custom-dashboard.component';
import { TwampLiveDashboardComponent } from './custom-dashboard/twamp-live-dashboard/twamp-live-dashboard.component';
import { MyReportsComponent } from './my-reports/my-reports.component';
import { ReportsWizardComponent } from './reports-wizard/reports-wizard.component';
import { ZoomDataComponent } from './zoom-data/zoom-data.component';

const routes: Routes = [
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

export class ReportsAndDashboardsRoutingModule { }
