import { RetChangeComponent } from './config-change/ret-change/ret-change.component';
import { SamsungRqaSchedulingComponent } from './config-change/rqa-scheduling/samsung-rqa-scheduling/samsung-rqa-scheduling.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: "Config-Change", children: [
      // { path: "Samsung-Rqa-Scheduling", component: SamsungRqaSchedulingComponent }
      { path: "Rqa-Scheduling/Samsung-Rqa-Scheduling", component: SamsungRqaSchedulingComponent },
      { path: "Ret-Change", component: RetChangeComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationManagementRoutingModule { }
