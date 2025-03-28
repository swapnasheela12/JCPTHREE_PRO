import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ONTCreateNewWorkorderComponent } from './ont/ont-create-new-workorder/ont-create-new-workorder.component';
import { OntComponent } from './ont/ont.component';
import { RecipeCreateNewWorkorderComponent } from './recipe/recipe-create-new-workorder/recipe-create-new-workorder.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RegulatoryCreateNewWorkorderComponent } from './regulatory/regulatory-create-new-workorder/regulatory-create-new-workorder.component';
import { RegulatoryComponent } from './regulatory/regulatory.component';
import { WorkorderDetailsComponent } from './regulatory/workorder-details/workorder-details.component';
import { CreateNewWorkorderComponent } from './web-performance-test/create-new-workorder/create-new-workorder.component';
import { ViewWorkorderComponent } from './web-performance-test/view-workorder/view-workorder.component';
import { WebPerformanceTestComponent } from './web-performance-test/web-performance-test.component';


const routes: Routes = [
  {
    path: 'Web-Performance-Test',
    children: [
      {
        path: '',
        component: WebPerformanceTestComponent,
      },
      {
        path: 'Create-New-Workorder',
            children: [
              {
                path: '',
                component: CreateNewWorkorderComponent,
              }
            ],
      },{
        path: 'View-Workorder',
        
        children: [
          {
            path: '',
            component: ViewWorkorderComponent,
          }]
      },
      {
        path: 'Copy-To-New-Workorder',
        children: [
          {
            path: '',
            component: CreateNewWorkorderComponent,
          }]
      }
    ]
  },
  {
    path: 'Regulatory-Reporting',
    children: [
      {
        path: '',
        component: RegulatoryComponent
      },
      {
        path: 'WO-Regulatory',
        children: [
          {
            path: '',
        component: WorkorderDetailsComponent
          }
        ]
      },
      {
        path: 'Create-New-Workorder',
            children: [
              {
                path: '',
                component: RegulatoryCreateNewWorkorderComponent,
              }
            ],
      },{
        path: 'View-Workorder',
        children: [
          {
            path: '',
            component: ViewWorkorderComponent,
          }]
      },
      {
        path: 'Copy-To-New-Workorder',
        children: [
          {
            path: '',
            component: RegulatoryCreateNewWorkorderComponent,
          }]
      }
    ]
  },
  {
    path: 'Recipe-Workorders',
    children: [
      {
        path: '',
        component: RecipeComponent,
      },
      {
        path: 'Create-New-Workorder',
            children: [
              {
                path: '',
                component: RecipeCreateNewWorkorderComponent,
              }
            ],
      },{
        path: 'View-Workorder',
  
        children: [
          {
            path: '',
            component: RecipeCreateNewWorkorderComponent,
          }]
      },
      {
        path: 'Copy-To-New-Workorder',
        children: [
          {
            path: '',
            component: RecipeCreateNewWorkorderComponent,
          }]
      }
    ]
  },
  {
    path: 'ONT-Workorders',
    children: [
      {
        path: '',
        component: OntComponent,
      },
      {
        path: 'Create-New-Workorder',
            children: [
              {
                path: '',
                component: ONTCreateNewWorkorderComponent,
              }
            ],
      },{
        path: 'View-Workorder',
  
        children: [
          {
            path: '',
            component: ONTCreateNewWorkorderComponent,
          }]
      },
      {
        path: 'Copy-To-New-Workorder',
        children: [
          {
            path: '',
            component: ONTCreateNewWorkorderComponent,
          }]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NvWorkordersRoutingModule { }
