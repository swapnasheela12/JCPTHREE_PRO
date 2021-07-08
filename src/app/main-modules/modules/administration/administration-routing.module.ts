import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PredictionSchedulingComponent } from './platform-administration/coverage-predictions/prediction-scheduling/prediction-scheduling.component';

const routes: Routes = [{ path: 'Coverage-Predictions/Prediction-Scheduling', component: PredictionSchedulingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
