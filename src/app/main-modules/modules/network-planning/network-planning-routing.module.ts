import { CreatePageComponent } from './rf-planning/nominal-generation-strategy/create-page/create-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: "RF-Planning", children: [
    { path: "Nominal-Strategy", component: CreatePageComponent }
  ]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkPlanningRoutingModule { }
