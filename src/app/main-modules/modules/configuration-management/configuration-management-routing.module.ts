import { RetChangeComponent } from './config-change/ret-change/ret-change.component';
import { SamsungRqaSchedulingComponent } from './config-change/rqa-scheduling/samsung-rqa-scheduling/samsung-rqa-scheduling.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TraceportActivationComponent } from './config-change/traceport-activation/traceport-activation.component';
import { EpsGoldenConfComponent } from './audit-and-query/core/eps-golden-conf/eps-golden-conf.component';


const routes: Routes = [
  {
    path: "Config-Change", children: [
      // { path: "Samsung-Rqa-Scheduling", component: SamsungRqaSchedulingComponent }
      { path: "Rqa-Scheduling/Samsung-Rqa-Scheduling", component: SamsungRqaSchedulingComponent },
      { path: "RET-Change", component: RetChangeComponent },
      { path:'Traceport-Activation', component: TraceportActivationComponent}
    ],
  },
  {
    path: "Audit-and-Query", children: [
      { path: "Core", children: [
        { path: 'EPS-Golden-Configuration', component: EpsGoldenConfComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationManagementRoutingModule { }
