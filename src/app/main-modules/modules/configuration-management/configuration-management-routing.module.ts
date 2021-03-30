import { RetChangeComponent } from './config-change/ret-change/ret-change.component';
import { SamsungRqaSchedulingComponent } from './config-change/rqa-scheduling/samsung-rqa-scheduling/samsung-rqa-scheduling.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TraceportActivationComponent } from './config-change/traceport-activation/traceport-activation.component';


const routes: Routes = [
  {
    path: "Config-Change", children: [
      // { path: "Samsung-Rqa-Scheduling", component: SamsungRqaSchedulingComponent }
      { path: "Rqa-Scheduling/Samsung-Rqa-Scheduling", component: SamsungRqaSchedulingComponent },
      { path: "RET-Change", component: RetChangeComponent },
      { path:'Traceport-Activation', component: TraceportActivationComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationManagementRoutingModule { }
