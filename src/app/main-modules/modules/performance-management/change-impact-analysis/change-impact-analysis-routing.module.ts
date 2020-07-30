import { CiaModuleComponent } from './../change-impact-analysis/cia-module/cia-module.component';
import { CiaKpiSettingsComponent } from './../change-impact-analysis/cia-kpi-settings/cia-kpi-settings.component';
import { CiaKpiAdminSettingsComponent } from './../change-impact-analysis/cia-kpi-admin-settings/cia-kpi-admin-settings.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: "CIA-Module",component: CiaModuleComponent },
    { path: "CIA-KPI-Settings", component: CiaKpiSettingsComponent },
    { path: "CIA-KPI-Admin-Settings", component: CiaKpiAdminSettingsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ChangeImpactAnanlysisRoutingModule { }