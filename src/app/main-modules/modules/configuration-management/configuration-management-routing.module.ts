import { RetChangeComponent } from './config-change/ret-change/ret-change.component';
import { SamsungRqaSchedulingComponent } from './config-change/rqa-scheduling/samsung-rqa-scheduling/samsung-rqa-scheduling.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TraceportActivationComponent } from './config-change/traceport-activation/traceport-activation.component';
import { EpsGoldenConfComponent } from './audit-and-query/core/eps-golden-conf/eps-golden-conf.component';
import { CreateEpsGoldenConfComponent } from './audit-and-query/core/create-eps-golden-conf/create-eps-golden-conf.component';
import { AddGoldenParameterComponent } from './audit-and-query/core/add-golden-parameter/add-golden-parameter.component';


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
        { path: 'EPS-Golden-Configuration', children:[
            {path: '',component: EpsGoldenConfComponent},
            { path: 'Create', component: CreateEpsGoldenConfComponent},
            { path: 'AddGoldenParameter', component:AddGoldenParameterComponent }
          ]
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
export class ConfigurationManagementRoutingModule { }
