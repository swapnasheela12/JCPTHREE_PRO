import { CreatePageComponent } from './rf-planning/nominal-generation-strategy/create-page/create-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoveragePredictionComponent } from './rf-planning/coverage-prediction/coverage-prediction.component';
import { CreateTaskPageComponent } from './rf-planning/coverage-prediction/create-task-page/create-task-page.component';


const routes: Routes = [{
  path: "RF-Planning", children: [
    { path: "Create", component: CreateTaskPageComponent },
    { path: "5G-Coverage-Prediction", component: CoveragePredictionComponent }
  ]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkPlanningRoutingModule { }
