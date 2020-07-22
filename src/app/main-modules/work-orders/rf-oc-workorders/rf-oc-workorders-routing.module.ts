import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectorMisalignmentComponent } from './category-wise-wo-listing/sector-misalignment/sector-misalignment.component';


const routes: Routes = [
  {
    path: "Category-Wise-Workorder-Listing", children: [
      {path: "Sector-Misalignment", component: SectorMisalignmentComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RfOcWorkordersModuleRoutingModule { }
