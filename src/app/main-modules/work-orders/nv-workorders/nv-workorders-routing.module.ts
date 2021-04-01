import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateNewWorkorderComponent } from './web-performance-test/create-new-workorder/create-new-workorder.component';
import { WebPerformanceTestComponent } from './web-performance-test/web-performance-test.component';


const routes: Routes = [
//  { path: 'Web-Performance-Test', component: WebPerformanceTestComponent }


      {
        path: "Web-Performance-Test",
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
