import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginJcpThreeComponent } from "./login-jcp-three/login-jcp-three.component";
// import { MainLayerComponent } from './main-layer/main-layer.component';

const routes: Routes = [
  { path: "", component: LoginJcpThreeComponent },
  {
    path: "JCP", loadChildren:  () => import("../app/home-jcp-three/home-jcp-three.module").then(m => m.HomeJcpThreeModule)
  },
  { path: 'administration', loadChildren: () => import('./main-modules/modules/administration/administration.module').then(m => m.AdministrationModule) },
  { path: "**", redirectTo: "/JCP/Home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
