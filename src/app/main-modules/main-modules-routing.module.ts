import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyReportsComponent } from './reports-dashboards/my-reports/my-reports.component';
import { ReportsWizardComponent } from './reports-dashboards/reports-wizard/reports-wizard.component';
import { MainLayerComponent } from './main-layer/main-layer.component';
// import { CustomDashboardComponent } from './reports-dashboards/custom-dashboard/custom-dashboard.component';
// import { TwampLiveDashboardComponent } from './reports-dashboards/custom-dashboard/twamp-live-dashboard/twamp-live-dashboard.component';

const routes: Routes = [
  { path: "", component: MainLayerComponent },
  { path: "Report-Wizard", component: ReportsWizardComponent },
  { path: "My-Reports", component: MyReportsComponent },
  // { path:"Dashboards", children:[
  //   { path:"", component: CustomDashboardComponent },
  //     { path:"Custom-Dashboard", children: [
  //         { path:"Twamp-Live-Dashboard", component: TwampLiveDashboardComponent }
  //       ]
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainModulesRoutingModule { }
