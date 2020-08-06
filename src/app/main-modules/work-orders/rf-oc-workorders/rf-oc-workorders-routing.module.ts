import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectorMisalignmentComponent } from './category-wise-wo-listing/sector-misalignment/sector-misalignment.component';
import { OvershootingCellComponent } from './category-wise-wo-listing/overshooting-cell/overshooting-cell.component';
import { ExecutionTaskComponent } from './category-wise-wo-listing/sector-misalignment/wo-sector-misalignment/execution-task/execution-task.component';
import { WoSectorMisalignmentComponent } from './category-wise-wo-listing/sector-misalignment/wo-sector-misalignment/wo-sector-misalignment.component';
import { OvershootingExeTaskComponent } from './category-wise-wo-listing/overshooting-cell/overshooting-exe-task/overshooting-exe-task.component';
import { IanLeadComponent } from './category-wise-wo-listing/overshooting-cell/ian-lead/ian-lead.component';
import { WoOvershootingCellComponent } from './category-wise-wo-listing/overshooting-cell/wo-overshooting-cell/wo-overshooting-cell.component';


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
       // component: OvershootingCellComponent,
        children: [
          {
            path: '',
            component: OvershootingCellComponent,
          },
          {
            path: 'WO-Overshooting-Cell',
            component: WoOvershootingCellComponent
          },
          {
            path: 'Rfoc-lead',
          component: OvershootingExeTaskComponent,

          },
          {
            path: 'Ian-Lead',
          component: IanLeadComponent

          }
        ]
       
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RfOcWorkordersModuleRoutingModule { }
