import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../../_helpers";
import { MyJcpComponent } from './my-jcp.component';
//const routes: Routes = [];
const routes: Routes = [
  {
    path: "", component: MyJcpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyJcpRoutingModule { }
