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
import { PropertiesComponent } from './modules/components/properties/properties.component';
// import { MainLayerComponent } from './main-layer/main-layer.component';

const routes: Routes = [
  { path: "", component: LoginJcpThreeComponent },
  {
    path: "JCP", component: HomeJcpThreeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "Home", component: LandingHomeComponent },
      { path: "Row-Rendering", component:RowRenderingComponent},
      { path: "Column-Rendering", component:ColumnRenderingComponent},
      { path: "Tree-Rendering", component:TreeRenderingComponent},
      { path: "Ag-Column-Rendering", component:AgGridColumnRenderingComponent},
      { path: "Ag-Row-Rendering", component:AgGridRowRenderingComponent},
      { path: "Ag-Tree-Rendering", component:AgGridTreeRenderingComponent},
      { path: "My-JCP", component:MyJcpComponent},
      {path: "Properties", component: PropertiesComponent},
      { path: "Layers_Cust", component:LayersCustComponent},
      { path: "Layers", loadChildren: "../app/main-modules/main-modules.module#MainModulesModule"},
      { path: "Reports-and-Dashboards", loadChildren: "../app/main-modules/main-modules.module#MainModulesModule" },
      {
        path: "Modules", children: [
          { path: "Performance-Management", loadChildren: "../app/main-modules/modules/performance-management/performance-management.module#PerformanceManagementModule" },
          { path: "Planning-Deployment", loadChildren: "../app/main-modules/modules/planning-deployment/planning-deployment.module#PlanningDeploymentModule" }
        ]
      },
      {
        path: "Work-Orders", children: [
            { path: "Rf-Oc-Workorders", loadChildren: "../app/main-modules/work-orders/rf-oc-workorders/rf-oc-workorders.module#RfOcWorkordersModule" },
        ]
      },
      // { path: "table-view-row", component:},src\app/main-modules/modules/planning-deployment/planning-deployment.module.ts
    ],
  },
 

  { path: "**", redirectTo: "/JCP/Home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
