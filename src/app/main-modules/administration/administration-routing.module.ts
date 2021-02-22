import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigTemplateComponent } from './config-template/config-template.component';
import { CreateQueryPageComponent } from './module-management/nominal-planning/np-query-administration/create-query-page/create-query-page.component';
import { NpQueryAdministrationComponent } from './module-management/nominal-planning/np-query-administration/np-query-administration.component';
import { ReasonTemplatesComponent } from './reason-templates/reason-templates.component';
import { CreateSlaConfigurationComponent } from './site-sla-configuration/create-sla-configuration/create-sla-configuration.component';
import { SiteSlaConfigurationComponent } from './site-sla-configuration/site-sla-configuration.component';
import { StatusTemplateComponent } from './status-template/status-template.component';


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
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
