import { WoAssignmentComponent } from './ret-change/wo-assignment/wo-assignment.component';
import { RqaSchedulingWorkorderComponent } from './rqa-scheduling-workorder/rqa-scheduling-workorder.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CellDetailsComponent } from './ret-change/cell-details/cell-details.component';
import { WorkorderDetailsComponent } from './ret-change/workorder-details/workorder-details.component';
import { RetChangeComponent } from './ret-change/ret-change.component';


const routes: Routes = [
  {
    path: "Rqa-Scheduling-Workorder", component: RqaSchedulingWorkorderComponent,
  },

  {
    path: "RET-Change",
    children: [
      {
        path: '',
        component: RetChangeComponent,
      },
      {
        path: 'Detail-View',
        component: WoAssignmentComponent,
      },
      {
        path: 'Cell-Details',
        children: [
          {
            path: '',
            component: CellDetailsComponent,
          }
        ]
      },
      {
        path: 'Workorder-Details',
        children: [
          {
            path: '',
            component: WorkorderDetailsComponent,
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmWorkordersRoutingModule { }
