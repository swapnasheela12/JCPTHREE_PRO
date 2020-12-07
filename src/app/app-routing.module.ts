import { CmWorkordersModule } from './main-modules/work-orders/cm-workorders/cm-workorders.module';
import { LayersCustComponent } from './modules/layers-cust/layers-cust.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginJcpThreeComponent } from "./login-jcp-three/login-jcp-three.component";
import { HomeJcpThreeComponent } from "./home-jcp-three/home-jcp-three.component";
import { AuthGuard } from "./_helpers";
import { ReportsWizardComponent } from './main-modules/reports-dashboards/reports-wizard/reports-wizard.component';
import { MyReportsComponent } from './main-modules/reports-dashboards/my-reports/my-reports.component';
import { LandingHomeComponent } from './home-jcp-three/landing-home/landing-home.component';
import { MyJcpComponent } from './main-modules/my-jcp/my-jcp.component';
import { RowRenderingComponent } from './modules/components/row-rendering/row-rendering.component';
import { ColumnRenderingComponent } from './modules/components/column-rendering/column-rendering.component';
import { TreeRenderingComponent } from './modules/components/tree-rendering/tree-rendering.component';
import { AgGridColumnRenderingComponent } from './modules/components/ag-grid-column-rendering/ag-grid-column-rendering.component';
import { AgGridRowRenderingComponent } from './modules/components/ag-grid-row-rendering/ag-grid-row-rendering.component';
import { AgGridTreeRenderingComponent } from './modules/components/ag-grid-tree-rendering/ag-grid-tree-rendering.component';
// import { MainLayerComponent } from './main-layer/main-layer.component';

const routes: Routes = [
  { path: "", component: LoginJcpThreeComponent },
  {
    path: "JCP", loadChildren:  () => import("../app/home-jcp-three/home-jcp-three.module").then(m => m.HomeJcpThreeModule)
  },
  { path: "**", redirectTo: "/JCP/Home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
