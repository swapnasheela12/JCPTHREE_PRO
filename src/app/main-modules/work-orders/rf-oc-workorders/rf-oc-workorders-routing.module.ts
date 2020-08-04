import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectorMisalignmentComponent } from './category-wise-wo-listing/sector-misalignment/sector-misalignment.component';
import { OvershootingCellComponent } from './category-wise-wo-listing/overshooting-cell/overshooting-cell.component';
import { ExecutionTaskComponent } from './category-wise-wo-listing/sector-misalignment/wo-sector-misalignment/execution-task/execution-task.component';
import { WoSectorMisalignmentComponent } from './category-wise-wo-listing/sector-misalignment/wo-sector-misalignment/wo-sector-misalignment.component';


const routes: Routes = [
  {
    path: "Category-Wise-Workorder-Listing", children: [
      {
        path: "Sector-Misalignment",
        children: [
          {
            path: '',
            component: SectorMisalignmentComponent,
          },
          {
            path: 'WO-Sector-Misalignment',
            children: [
              {
                path: '',
                component: WoSectorMisalignmentComponent,
              },
              {
                path: 'Execution-Task',
                component: ExecutionTaskComponent
              }
            ]

          }
        ]
      },
      {
        path: "Overshooting-Cell",
        component: OvershootingCellComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RfOcWorkordersModuleRoutingModule { }
