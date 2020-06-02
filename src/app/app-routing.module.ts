import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginJcpThreeComponent } from "./login-jcp-three/login-jcp-three.component";
import { HomeJcpThreeComponent } from "./home-jcp-three/home-jcp-three.component";
import { AuthGuard } from "./_helpers";
import { ReportsWizardComponent } from './main-modules/reports-dashboards/reports-wizard/reports-wizard.component';
import { MyReportsComponent } from './main-modules/reports-dashboards/my-reports/my-reports.component';
import { LandingHomeComponent } from './home-jcp-three/landing-home/landing-home.component';
import { MainLayerComponent } from './main-layer/main-layer.component';

const routes: Routes = [
 
  { path: "", component: LoginJcpThreeComponent },
  {
    path: "JCP", component: HomeJcpThreeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "Home", component: LandingHomeComponent },
      // { path: "Layers", component:LayerMainComponent},
      { path: "Layers", component:MainLayerComponent},
    
      { path: "Reports-and-Dashboard", loadChildren: "../app/main-modules/main-modules.module#MainModulesModule" }
    ],
  },
 

  { path: "**", redirectTo: "/JCP/Home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
