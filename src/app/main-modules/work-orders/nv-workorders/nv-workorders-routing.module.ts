import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebPerformanceTestComponent } from './web-performance-test/web-performance-test.component';


const routes: Routes = [
  {path: 'Web-Performance-Test', component: WebPerformanceTestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NvWorkordersRoutingModule { }
