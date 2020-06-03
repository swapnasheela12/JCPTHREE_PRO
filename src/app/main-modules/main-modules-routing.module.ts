import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyReportsComponent } from './reports-dashboards/my-reports/my-reports.component';
import { ReportsWizardComponent } from './reports-dashboards/reports-wizard/reports-wizard.component';
import { MainLayerComponent } from './main-layer/main-layer.component';


const routes: Routes = [
  {
    path:"",component:MainLayerComponent
  },
  {
    path:"Report-Wizard",component:ReportsWizardComponent
  },
  {
    path:"My-Reports",component:MyReportsComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainModulesRoutingModule { }
