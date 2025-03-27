import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnbscComponent } from './enbsc/enbsc.component';
import { LinkBudgetComponent } from './link-budget/link-budget.component';
import { CreateTaskPageComponent } from './nominal-capacity/create-task-page/create-task-page.component';
// import { NcQueryAdministrationComponent } from './nominal-capacity/nc-query-administration/nc-query-administration.component';
import { NominalCapacityComponent } from './nominal-capacity/nominal-capacity.component';
import { NominalGenerationCoverageComponent } from './nominal-generation-coverage/nominal-generation-coverage.component';
import { NominalGenerationCreateComponent } from './nominal-generation-coverage/nominal-generation-create/nominal-generation-create.component';
import { NominalGenerationSummaryComponent } from './nominal-generation-coverage/nominal-generation-summary/nominal-generation-summary.component';
import { NominalSiteDistributionSummaryComponent } from './nominal-generation-coverage/nominal-site-distribution-summary/nominal-site-distribution-summary.component';
import { NominalGenerationPerformanceSummaryComponent } from './nominal-generation-coverage/nominal-generation-performance-summary/nominal-generation-performance-summary.component';
import { NominalValidationComponent } from './nominal-validation/nominal-validation.component';
import { NominalValidationCreateComponent } from './nominal-validation/nominal-validation-create/nominal-validation-create.component';
import { NominalValidationSummaryComponent } from './nominal-validation/nominal-validation-summary/nominal-validation-summary.component';
import { NominalValidationPerformanceSummaryComponent } from './nominal-validation/nominal-validation-performance-summary/nominal-validation-performance-summary.component';
import { NominalValidationOptimizationSummaryComponent } from './nominal-validation/nominal-validation-optimization-summary/nominal-validation-optimization-summary.component';
import { NominalValidationSiteDistributionSummaryComponent } from './nominal-validation/nominal-validation-site-distribution-summary/nominal-validation-site-distribution-summary.component';


const routes: Routes = [
  { path: "enbsc", component: EnbscComponent },
  { path: '5G-Link-Budget', component: LinkBudgetComponent},
  { path: 'Nominal-Capacity',
    children: [
      { path: "", component: NominalCapacityComponent },
      { path: "Create-Nominal-Task", component: CreateTaskPageComponent },
    ]
  },
  // { path: 'Query-Administration',
  //   children: [
  //     // { path: "", component: NcQueryAdministrationComponent },
  //     { path: "Create-Query-Task", component: CreateTaskPageComponent },
  //   ]
  // },
  { path: 'Nominal-Generation', children: [
    { path:'', component: NominalGenerationCoverageComponent },
    { path: 'Create', component: NominalGenerationCreateComponent },
    { path: 'Summary', component: NominalGenerationSummaryComponent },
    { path: 'Site-Distribution-Summary', component: NominalSiteDistributionSummaryComponent },
    { path: 'Performance-Summary', component: NominalGenerationPerformanceSummaryComponent}
  ]},
  { path: 'Nominal-Validation', children: [
    { path:'', component: NominalValidationComponent },
    { path: 'Create', component: NominalValidationCreateComponent },
    { path: 'Site-Distribution-Summary', component: NominalValidationSiteDistributionSummaryComponent },
    { path: 'Performance-Summary', component: NominalValidationPerformanceSummaryComponent},
    { path: 'Optimization-Summary', component: NominalValidationOptimizationSummaryComponent},
    { path: 'Summary', component: NominalValidationSummaryComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningDeploymentRoutingModule { }
