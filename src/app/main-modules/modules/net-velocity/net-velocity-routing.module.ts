import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TraiQosCallPlanComponent } from './trai-qos-call-plan/trai-qos-call-plan.component';


const routes: Routes = [
  { path: "Trai-Qos-Call-Plan", component: TraiQosCallPlanComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetVelocityRoutingModule { }
