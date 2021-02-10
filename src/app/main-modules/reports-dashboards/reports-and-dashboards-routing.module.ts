import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomDashboardComponent } from './custom-dashboard/custom-dashboard.component';
import { SlaConformanceNodewiseComponent } from './custom-dashboard/sla-conformance-nodewise/sla-conformance-nodewise.component';
import { SlaConformanceComponent } from './custom-dashboard/sla-conformance/sla-conformance.component';
import { TwampInterCircleComponent } from './custom-dashboard/twamp-inter-circle/twamp-inter-circle.component';
import { TwampLiveDashboardComponent } from './custom-dashboard/twamp-live-dashboard/twamp-live-dashboard.component';
import { TwampMgwBgwIntercircleComponent } from './custom-dashboard/twamp-mgw-bgw-intercircle/twamp-mgw-bgw-intercircle.component';
import { TwampNidMeasurementComponent } from './custom-dashboard/twamp-nid-measurement/twamp-nid-measurement.component';
import { MyReportsComponent } from './my-reports/my-reports.component';
import { ReportsWizardComponent } from './reports-wizard/reports-wizard.component';
import { ZoomDataComponent } from './zoom-data/zoom-data.component';


const routes: Routes = [
  { path: "Report-Wizard", component: ReportsWizardComponent },
  { path: "My-Reports", component: MyReportsComponent },
  {
    path: "Custom-Dashboards", children: [
      { path: "", component: CustomDashboardComponent },
      { path: "Twamp-Live-Dashboard", component: TwampLiveDashboardComponent },
      { path: "SLA-Conformance", component: SlaConformanceComponent },
      { path: "Twamp-Mgw-Bgw-Inter-Circle", component: TwampMgwBgwIntercircleComponent },
      { path: "Twamp-Inter-Circle", component: TwampInterCircleComponent },
      { path: "Twamp-Mgw-Bgw-Nid-Measurement", component: TwampNidMeasurementComponent },
      { path: "SLA-Conformance-Node-Wise", component: SlaConformanceNodewiseComponent },
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
