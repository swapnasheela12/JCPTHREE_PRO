import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginJcpThreeComponent } from "./login-jcp-three/login-jcp-three.component";
import { HomeJcpThreeComponent } from "./home-jcp-three/home-jcp-three.component";
import { AuthGuard } from "./_helpers";
import { ReportsWizardComponent } from './main-modules/reports-dashboards/reports-wizard/reports-wizard.component';
import { MyReportsComponent } from './main-modules/reports-dashboards/my-reports/my-reports.component';
import { LandingHomeComponent } from './home-jcp-three/landing-home/landing-home.component';

const routes: Routes = [
  // {
  //   path: "portaljcp",
  //   component: HomeJcpThreeComponent,
  //   canActivate: [AuthGuard]
  // },
  { path: "", component: LoginJcpThreeComponent },
  {
    path: "Home", component: HomeJcpThreeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: LandingHomeComponent },
      { path: "Reports-and-Dashboard", loadChildren: "../app/main-modules/main-modules.module#MainModulesModule" },
    ]
  },
  // {
  //   path: "Modules",
  //   children: [{
  //     path: "ConfigurationManagement",
  //     children: [{
  //       path: "Reports",component: MyReportsComponent
  //     }]
  //   }]

  // },
  // {
  //   path: "",
  //   component: SidebarmenuComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     // { path: "home",
  //     //   component: HomeJcpThreeComponent},
  //     {
  //       path: "layer",
  //       children: [
  //         {
  //           path: "sites",
  //           children: [
  //             { path: "macro", component: MacroComponent }
  //             // {path: 'become-angular-tailer', component: FourthComponent},
  //             // {path: 'material-design', component: FirstComponent},
  //             // {path: 'what-up-web', component: SecondComponent}
  //           ]
  //         }
  //         // {
  //         //   path: "speakers",
  //         //   children: [
  //         //     {
  //         //       path: "michael-prentice",
  //         //       // children: [{ path: "material-design", component: FirstComponent }]
  //         //     },
  //         //     // {
  //         //     //   path: "stephen-fluin",
  //         //     //   children: [{ path: "what-up-web", component: SecondComponent }]
  //         //     // },
  //         //     {
  //         //       path: "mike-brocchi",
  //         //       children: [
  //         //         // { path: "my-ally-cli", component: ThirdComponent },
  //         //         // { path: "become-angular-tailer", component: FourthComponent }
  //         //       ]
  //         //     }
  //         //   ]
  //         // }
  //       ]
  //     }
  //   ]
  // },

  { path: "**", redirectTo: "/Home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
