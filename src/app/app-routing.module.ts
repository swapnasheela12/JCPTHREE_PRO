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
      { path: "My-JCP", component:MyJcpComponent},
      { path: "Layers", loadChildren: "../app/main-modules/main-modules.module#MainModulesModule"},
      { path: "Reports-and-Dashboard", loadChildren: "../app/main-modules/main-modules.module#MainModulesModule" },
      { path: "Performance-Dashboard", loadChildren: "../app/main-modules/performance-dashboard/performance-dashboard.module#PerformanceDashboardModule" },
      { path: "Modules", children: [
        { path: "Performace-Management", loadChildren: "../app/main-modules/main-modules.module#MainModulesModule"}
      ]},
      // { path: "table-view-row", component:},
    ],
  },
 

  { path: "**", redirectTo: "/JCP/Home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
