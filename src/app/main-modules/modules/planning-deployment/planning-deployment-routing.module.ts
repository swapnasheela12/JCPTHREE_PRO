import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnbscComponent } from './enbsc/enbsc.component';
import { LinkBudgetComponent } from './link-budget/link-budget.component';


const routes: Routes = [
  { path: "enbsc", component: EnbscComponent },
  { path: '5G-Link-Budget', component: LinkBudgetComponent}
 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningDeploymentRoutingModule { }
