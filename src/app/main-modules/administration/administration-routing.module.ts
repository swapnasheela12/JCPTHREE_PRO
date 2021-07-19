import { ChartScheduledPredictionsComponent } from './platform-administration/coverage-predictions/prediction-scheduling-details/chart-scheduled-predictions/chart-scheduled-predictions.component';
import { PredictionSchedulingDetailsComponent } from './platform-administration/coverage-predictions/prediction-scheduling-details/prediction-scheduling-details.component';
import { PredictionSchedulingComponent } from './platform-administration/coverage-predictions/prediction-scheduling/prediction-scheduling.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TraiQosCallPlanComponent } from './module-management/net-velocity/trai-qos-call-plan/trai-qos-call-plan.component';
import { ConfigTemplateComponent } from './module-management/network-deployment/plan-to-build/gNodeB/config-template/config-template.component';
import { ReasonTemplatesComponent } from './module-management/network-deployment/plan-to-build/gNodeB/reason-templates/reason-templates.component';
import { CreateSlaConfigurationComponent } from './module-management/network-deployment/plan-to-build/gNodeB/site-sla-configuration/create-sla-configuration/create-sla-configuration.component';
import { SiteSlaConfigurationComponent } from './module-management/network-deployment/plan-to-build/gNodeB/site-sla-configuration/site-sla-configuration.component';
import { StatusTemplateComponent } from './module-management/network-deployment/plan-to-build/gNodeB/status-template/status-template.component';
import { OdscConfigTemplateComponent } from './module-management/network-deployment/plan-to-build/odsc/config-template/odsc-config-template.component';
import { OdscReasonTemplatesComponent } from './module-management/network-deployment/plan-to-build/odsc/reason-templates/odsc-reason-templates.component';
import { OdscCreateSlaConfigurationComponent } from './module-management/network-deployment/plan-to-build/odsc/site-sla-configuration/create-sla-configuration/odsc-create-sla-configuration.component';
import { OdscSiteSlaConfigurationComponent } from './module-management/network-deployment/plan-to-build/odsc/site-sla-configuration/odsc-site-sla-configuration.component';
import { OdscStatusTemplateComponent } from './module-management/network-deployment/plan-to-build/odsc/status-template/odsc-status-template.component';
import { CreateQueryPageComponent } from './module-management/nominal-planning/np-query-administration/create-query-page/create-query-page.component';
import { NpQueryAdministrationComponent } from './module-management/nominal-planning/np-query-administration/np-query-administration.component';


const routes: Routes = [
  {
    path: "", children: [
      {
        path: "Plan-To-Build",
        children: [
          {
            path: "gNodeB",
            children: [
              {
                path: "Reason-Template",
                children: [
                  {
                    path: '',
                    component: ReasonTemplatesComponent,
                  }
                ]
              },
              {
                path: "Site-SLA-Configuration",
                children: [
                  {
                    path: '',
                    component: SiteSlaConfigurationComponent,
                  },
                  {
                    path: 'Create-Site-Sla-Configuration',
                    component: CreateSlaConfigurationComponent
                  },
                ]
              },
              {
                path: "Config-Template",
                children: [
                  {
                    path: '',
                    component: ConfigTemplateComponent,
                  }
                ]
              },
              {
                path: "Status-Template",
                children: [
                  {
                    path: '',
                    component: StatusTemplateComponent,
                  }
                ]
              }
            ]
          },
          {
            path: "odsc",
            children: [
              {
                path: "Reason-Template",
                children: [
                  {
                    path: '',
                    component: OdscReasonTemplatesComponent,
                  }
                ]
              },
              {
                path: "Site-SLA-Configuration",
                children: [
                  {
                    path: '',
                    component: OdscSiteSlaConfigurationComponent,
                  },
                  {
                    path: 'Create-Site-Sla-Configuration',
                    component: OdscCreateSlaConfigurationComponent
                  },
                ]
              },
              {
                path: "Config-Template",
                children: [
                  {
                    path: '',
                    component: OdscConfigTemplateComponent,
                  }
                ]
              },
              {
                path: "Status-Template",
                children: [
                  {
                    path: '',
                    component: OdscStatusTemplateComponent,
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'Module-Management', children: [
          {
            path: 'Nominal-Planning', children: [
              {
                path: 'Query-Administration', children: [
                  { path: '', component: NpQueryAdministrationComponent },
                  { path: 'Create-Query', component: CreateQueryPageComponent },
                ]
              },
            ]
          },
          {
            path: 'Net-Velocity',
            children: [
              { path: "Trai-Qos-Call-Plan", component: TraiQosCallPlanComponent }
            ]
          }

        ]
      }
    ]
  },
  {
    path: "Coverage-Predictions", children: [
      { path: "Prediction-Scheduling", component: PredictionSchedulingComponent },
      { path: "Create-Prediction-Scheduling", component: PredictionSchedulingDetailsComponent },
      { path: "Prediction-Status", component: ChartScheduledPredictionsComponent },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
