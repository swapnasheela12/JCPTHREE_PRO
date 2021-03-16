import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { histogram } from 'd3';
import { SiteDatabaseComponent } from './gNodeB/site-database/site-database.component';
import { SiteHistoryDetailsComponent } from './gNodeB/site-database/site-id-detail/site-history-details/site-history-details.component';
import { SiteIdDetailComponent } from './gNodeB/site-database/site-id-detail/site-id-detail.component';
import { SapIdDetailsComponent } from './gNodeB/task-details/sap-id-details/sap-id-details.component';
import { TaskDetailsComponent } from './gNodeB/task-details/task-details.component';


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
