import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiaModuleComponent } from './../change-impact-analysis/cia-module/cia-module.component';
import { CiaKpiSettingsComponent } from './../change-impact-analysis/cia-kpi-settings/cia-kpi-settings.component';
import { CiaAdminSettingsComponent } from './../change-impact-analysis/cia-kpi-admin-settings/cia-kpi-admin-settings.component';

import { A11yModule } from "@angular/cdk/a11y";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatCardModule } from "@angular/material/card";;
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { AgGridModule } from 'ag-grid-angular';
import { DeleteRendererComponent } from './cia-module/renderer/delete-renderer.component';
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { CustomHeaderComponent } from './cia-module/renderer/custom-header.component';
import { ChangeImpactAnanlysisRoutingModule } from './change-impact-analysis-routing.module';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ciaDropdownRenderersComponent } from './renderer/cia-renderer.component';
import { snackBarToastComponent } from './../../../../core/components/commanPopup/common-popup/common-popup.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    CiaModuleComponent,
    CiaKpiSettingsComponent,
    CiaAdminSettingsComponent,
    DeleteRendererComponent,
    CustomHeaderComponent,
    ciaDropdownRenderersComponent,
    snackBarToastComponent
  ],
  imports: [
    CommonModule,
    ChangeImpactAnanlysisRoutingModule,
    FlexLayoutModule,
    AgGridModule.withComponents([DeleteRendererComponent, CustomHeaderComponent, ciaDropdownRenderersComponent]),
    FormsModule,
    ReactiveFormsModule,
    A11yModule,
    DragDropModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatTooltipModule,
    MatDividerModule,
    NgxMatSelectSearchModule
    // snackBarToastComponent
  ],
  exports: [
    DeleteRendererComponent, CustomHeaderComponent
  ],
  entryComponents : [
    snackBarToastComponent
  ],
  providers: []
})
export class ChangeImpactAnanlysisModule { }



