import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectorMisalignmentComponent } from './category-wise-wo-listing/sector-misalignment/sector-misalignment.component';
import { OvershootingCellComponent } from './category-wise-wo-listing/overshooting-cell/overshooting-cell.component';


const routes: Routes = [
  {
    path: "Category-Wise-Workorder-Listing", children: [
      {path: "Sector-Misalignment", component: SectorMisalignmentComponent},
      {path: "Overshooting-Cell", component: OvershootingCellComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RfOcWorkordersModuleRoutingModule { }
