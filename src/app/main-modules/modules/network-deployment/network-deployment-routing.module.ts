import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { histogram } from 'd3';
import { SiteDatabaseComponent } from './gNodeB/site-database/site-database.component';
import { SiteHistoryDetailsComponent } from './gNodeB/site-database/site-id-detail/site-history-details/site-history-details.component';
import { SiteIdDetailComponent } from './gNodeB/site-database/site-id-detail/site-id-detail.component';
import { SapIdDetailsComponent } from './gNodeB/task-details/sap-id-details/sap-id-details.component';
import { TaskDetailsComponent } from './gNodeB/task-details/task-details.component';
import { OdscSiteDatabaseComponent } from './odsc/site-database/odsc-site-database.component';
import { OdscSiteIdDetailComponent } from './odsc/site-database/site-id-detail/odsc-site-id-detail.component';
import { OdscSiteHistoryDetailsComponent } from './odsc/site-database/site-id-detail/site-history-details/odsc-site-history-details.component';


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
                path: "Task-Details",
                children: [
                  {
                    path: '',
                    component: TaskDetailsComponent,
                  },
                  {
                    path: 'Sap-Id-Details',
                    children: [
                      {
                        path: '',
                        component: SapIdDetailsComponent,
                      }
                    ]

                  }
                ]
              },
              {
                path: "Site-Database",
                children: [
                  {
                    path: '',
                    component: SiteDatabaseComponent
                  },
                  {
                    path: 'Site-Id-Details',
                    children: [
                      {
                        path: '',
                        component: SiteIdDetailComponent
                      },
                      {
                        path: 'Site-History-Details',
                        component: SiteHistoryDetailsComponent
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            path: "odsc",
            children: [
              {
                path: "Task-Details",
                children: [
                  {
                    path: '',
                    component: TaskDetailsComponent,
                  },
                  {
                    path: 'Sap-Id-Details',
                    children: [
                      {
                        path: '',
                        component: SapIdDetailsComponent,
                      }
                    ]

                  }
                ]
              },
              {
                path: "Site-Database",
                children: [
                  {
                    path: '',
                    component: OdscSiteDatabaseComponent
                  },
                  {
                    path: 'Site-Id-Details',
                    children: [
                      {
                        path: '',
                        component: OdscSiteIdDetailComponent
                      },
                      {
                        path: 'Site-History-Details',
                        component: OdscSiteHistoryDetailsComponent
                      }
                    ]
                  }
                ]
              }
            ]
          }

        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkDeploymentRoutingModule { }
