import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnbscComponent } from './enbsc/enbsc.component';
import { LinkBudgetComponent } from './link-budget/link-budget.component';
import { CreateTaskPageComponent } from './nominal-capacity/create-task-page/create-task-page.component';
import { NominalCapacityComponent } from './nominal-capacity/nominal-capacity.component';
import { NominalGenerationCoverageComponent } from './nominal-generation-coverage/nominal-generation-coverage.component';
import { NominalGenerationCreateComponent } from './nominal-generation-coverage/nominal-generation-create/nominal-generation-create.component';
import { NominalGenerationSummaryComponent } from './nominal-generation-coverage/nominal-generation-summary/nominal-generation-summary.component';
import { NominalSiteDistributionSummaryComponent } from './nominal-generation-coverage/nominal-site-distribution-summary/nominal-site-distribution-summary.component';


const routes: Routes = [
  { path: "enbsc", component: EnbscComponent },
  { path: '5G-Link-Budget', component: LinkBudgetComponent},
  { path: 'Nominal-Capacity',
    children: [
      { path: "", component: NominalCapacityComponent },
      { path: "Create-Nominal-Task", component: CreateTaskPageComponent },
    ]
  },
  { path: 'Nominal-Generation', children: [
    { path:'', component: NominalGenerationCoverageComponent },
    { path: 'Create', component: NominalGenerationCreateComponent },
    { path: 'Summary', component: NominalGenerationSummaryComponent },
    { path: 'Site-Distribution-Summary', component: NominalSiteDistributionSummaryComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningDeploymentRoutingModule { }
