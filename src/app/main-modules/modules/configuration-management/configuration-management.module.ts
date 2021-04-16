
import { RetChangeComponent } from './config-change/ret-change/ret-change.component';
import { DeleteCreatedKpiRendererComponent } from './../performance-management/kpi-editor/renderer/delete-renderer.component';
import { createKpiDropdownRendererComponent } from './../performance-management/kpi-editor/renderer/dropdown-renderer.component';
import { dropdownRendererComponent } from './../performance-management/report-builder/create-report/renderer/dropdown-renderer.component';
import { DeleteRendererComponent } from './../performance-management/change-impact-analysis/cia-module/renderer/delete-renderer.component';
import { conditionalDropdownRendererComponent } from './../performance-management/report-builder/create-report/renderer/conditional-dropdown-renderer.component';
import { VerticaldotRendererComponent } from './../performance-management/kpi-editor/renderer/verticaldot-renderer.component';
import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { CustomTooltip } from './../performance-management/my-performance-reports/custom-tooltip.component';
import { CoreModule } from './../../../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationManagementRoutingModule } from './configuration-management-routing.module';
import { SamsungRqaSchedulingComponent } from './config-change/rqa-scheduling/samsung-rqa-scheduling/samsung-rqa-scheduling.component';


import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HighchartsChartModule } from "highcharts-angular";
import { ChartModule } from 'angular-highcharts';
import { A11yModule } from "@angular/cdk/a11y";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { TraceportActivationComponent } from './config-change/traceport-activation/traceport-activation.component';
import { EpsGoldenConfComponent } from './audit-and-query/core/eps-golden-conf/eps-golden-conf.component';
@NgModule({
  declarations: [
    SamsungRqaSchedulingComponent,
    RetChangeComponent,
    TraceportActivationComponent,
    EpsGoldenConfComponent
  ],
  imports: [
    CommonModule,
    ConfigurationManagementRoutingModule,
    CoreModule,
    FlexLayoutModule,
    NgxDaterangepickerMd.forRoot(),
    AgGridModule.withComponents([CustomTooltip, StatusRendererComponent, VerticaldotRendererComponent, conditionalDropdownRendererComponent, DeleteRendererComponent, dropdownRendererComponent, createKpiDropdownRendererComponent, DeleteCreatedKpiRendererComponent]),
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    A11yModule,
    ChartModule,
    HighchartsChartModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    NgxMatSelectSearchModule,
    // ChangeImpactAnanlysisModule
  ]
})
export class ConfigurationManagementModule { }
