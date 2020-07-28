import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiaModuleComponent } from './../change-impact-analysis/cia-module/cia-module.component';
import { CiaKpiSettingsComponent } from './../change-impact-analysis/cia-kpi-settings/cia-kpi-settings.component';
import { CiaKpiAdminSettingsComponent } from './../change-impact-analysis/cia-kpi-admin-settings/cia-kpi-admin-settings.component';

import { MatCardModule } from "@angular/material/card";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    CiaModuleComponent,
    CiaKpiSettingsComponent,
    CiaKpiAdminSettingsComponent
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
    MatDialogModule
  ],
  exports: [],
  providers: []
})
export class ChangeImpactAnanlysisModule { }

