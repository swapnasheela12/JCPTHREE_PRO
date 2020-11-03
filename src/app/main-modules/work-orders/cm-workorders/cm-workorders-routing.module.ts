import { RqaSchedulingWorkorderComponent } from './rqa-scheduling-workorder/rqa-scheduling-workorder.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: "Rqa-Scheduling-Workorder",  component: RqaSchedulingWorkorderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmWorkordersRoutingModule { }
