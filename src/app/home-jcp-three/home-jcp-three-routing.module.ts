import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingHomeComponent } from '../home-jcp-three/landing-home/landing-home.component';
import { HomeJcpThreeComponent } from "../home-jcp-three/home-jcp-three.component";
import { AuthGuard } from "../_helpers";
import { LayersCustComponent } from '../modules/layers-cust/layers-cust.component';
import { AgGridTreeRenderingComponent } from '../modules/components/ag-grid-tree-rendering/ag-grid-tree-rendering.component';
import { AgGridColumnRenderingComponent } from '../modules/components/ag-grid-column-rendering/ag-grid-column-rendering.component';
import { TreeRenderingComponent } from '../modules/components/tree-rendering/tree-rendering.component';
import { ColumnRenderingComponent } from '../modules/components/column-rendering/column-rendering.component';
import { RowRenderingComponent } from '../modules/components/row-rendering/row-rendering.component';
//const routes: Routes = [];
const routes: Routes = [
  {
    path: "", component: HomeJcpThreeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "Home", component: LandingHomeComponent },
      { path: "Row-Rendering", component: RowRenderingComponent },
      { path: "Column-Rendering", component: ColumnRenderingComponent },
      { path: "Tree-Rendering", component: TreeRenderingComponent },
      { path: "Ag-Column-Rendering", component: AgGridColumnRenderingComponent },
      { path: "Ag-Row-Rendering", component: AgGridTreeRenderingComponent },
      { path: "Ag-Tree-Rendering", component: AgGridTreeRenderingComponent },
      { path: "Layers_Cust", component: LayersCustComponent },
      { path: "Layers", loadChildren: () => import("../../app/main-modules/main-layer/main-layer.module").then(m => m.MainLayerModule) },
      { path: "Reports-and-Dashboards", loadChildren: () => import("../../app/main-modules/reports-dashboards/reports-and-dashboards.module").then(m => m.ReportsAndDashboardsModule) },
      { path: "My-JCP", loadChildren: () => import("../../app/main-modules/my-jcp/my-jcp.module").then(m => m.MyJcpModule) },
      {
        path: "Modules", children: [
          { path: "Performance-Management", loadChildren: () => import("../../app/main-modules/modules/performance-management/performance-management.module").then(m => m.PerformanceManagementModule) },
          { path: 'Planning-Deployment', loadChildren: () => import('../../app/main-modules/modules/planning-deployment/planning-deployment.module').then(m => m.PlanningDeploymentModule) },
          { path: 'Configuration-Management',loadChildren: () => import('../../app/main-modules/modules/configuration-management/configuration-management.module').then(m => m.ConfigurationManagementModule)},
          { path: 'Fault-Management',loadChildren: () => import('../../app/main-modules/modules/fault-management/fault-management.module').then(m => m.FaultManagementModule)},
        ]
      },
      {
        path: "Work-Orders", children: [
          { path: 'Rf-Oc-Workorders', loadChildren: () => import('../../app/main-modules/work-orders/rf-oc-workorders/rf-oc-workorders.module').then(m => m.RfOcWorkordersModule) },
          { path: 'Cm-Workorders',loadChildren: () => import('./../../app/main-modules/work-orders/cm-workorders/cm-workorders.module').then(m => m.CmWorkordersModule)}
        ]
      }
    ],
  },
  { path: "**", redirectTo: "/JCP/Home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeJcpThreeRoutingModule { }
