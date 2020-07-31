import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiaModuleComponent } from './../change-impact-analysis/cia-module/cia-module.component';
import { CiaKpiSettingsComponent } from './../change-impact-analysis/cia-kpi-settings/cia-kpi-settings.component';
import { CiaAdminSettingsComponent } from './../change-impact-analysis/cia-kpi-admin-settings/cia-kpi-admin-settings.component';

import { MatCardModule } from "@angular/material/card";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { AgGridModule } from 'ag-grid-angular';
// import { dropdownRendererComponent } from '../report-builder/create-report/renderer/dropdown-renderer.component';

@NgModule({
  declarations: [
    CiaModuleComponent,
    CiaKpiSettingsComponent,
    CiaAdminSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    // AgGridModule.withComponents([ dropdownRendererComponent]),
  ],
  exports: [
    // dropdownRendererComponent
  ],
  providers: []
})
export class ChangeImpactAnanlysisModule { }

