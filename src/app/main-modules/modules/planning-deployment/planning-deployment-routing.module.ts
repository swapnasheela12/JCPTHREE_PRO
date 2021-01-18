import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnbscComponent } from './enbsc/enbsc.component';
import { LinkBudgetComponent } from './link-budget/link-budget.component';
import { CreateTaskPageComponent } from './nominal-capacity/create-task-page/create-task-page.component';
import { NominalCapacityComponent } from './nominal-capacity/nominal-capacity.component';

const routes: Routes = [
  { path: "enbsc", component: EnbscComponent },
  { path: '5G-Link-Budget', component: LinkBudgetComponent},
  { path: 'Nominal-Capacity',
  children: [
    { path: "", component: NominalCapacityComponent },
    { path: "Create-Nominal-Task", component: CreateTaskPageComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningDeploymentRoutingModule { }
