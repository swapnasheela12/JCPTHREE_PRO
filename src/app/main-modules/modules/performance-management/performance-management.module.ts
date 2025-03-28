import { CoreModule } from './../../../core/core.module';
import { ReportBuilderComponent } from './report-builder/report-builder.component';
import { VerticaldotRendererComponent } from './kpi-editor/renderer/verticaldot-renderer.component';
import { StatusRendererComponent } from './kpi-editor/renderer/status-renderer.component';
import { KpiEditorComponent } from './kpi-editor/kpi-editor.component';
import { conditionalDropdownRendererComponent } from './report-builder/create-report/renderer/conditional-dropdown-renderer.component';
import { DeleteRendererComponent } from './report-builder/create-report/renderer/delete-renderer.component';
import { dropdownRendererComponent } from './report-builder/create-report/renderer/dropdown-renderer.component';
import { createKpiDropdownRendererComponent } from './kpi-editor/renderer/dropdown-renderer.component';
import { DeleteCreatedKpiRendererComponent } from './kpi-editor/renderer/delete-renderer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceManagementRoutingModule } from './performance-management-routing.module';
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
import { WifiUtilityComponent } from './wifi-utility/wifi-utility.component';
import { CreateKpiComponent } from './kpi-editor/create-kpi/create-kpi.component';
import { CreateReportComponent } from './report-builder/create-report/create-report.component';
import { AddGroupPopupComponent } from './report-builder/create-report/add-group-popup/add-group-popup.component';
import { ComputationSettingsPoupComponent } from './kpi-editor/create-kpi/computation-settings-poup/computation-settings-poup.component';
import { IfElsePopupComponent } from './kpi-editor/create-kpi/if-else-popup/if-else-popup.component';
import { HextodocPopupComponent } from './kpi-editor/create-kpi/hextodoc-popup/hextodoc-popup.component';
import { ChangeImpactAnanlysisModule } from './change-impact-analysis/change-impact-analysis.module';
import { CustomTooltip } from './my-performance-reports/custom-tooltip.component';
import { ViewSummaryComponent } from './my-performance-reports/view-summary/view-summary.component';
import { ChangeImpactAnalysisComponent } from './my-performance-reports/change-impact-analysis/change-impact-analysis.component';
import { MyPerformanceReportsComponent } from './my-performance-reports/my-performance-reports.component';
import { CeilingPopupComponent } from './kpi-editor/create-kpi/ceiling-popup/ceiling-popup.component';
import { InfoPopupComponent } from './kpi-editor/create-kpi/info-popup/info-popup.component';
import { FloorPopupComponent } from './kpi-editor/create-kpi/floor-popup/floor-popup.component';
import { AlarmDetailsPopupComponent } from './my-performance-reports/change-impact-analysis/alarm-details-popup/alarm-details-popup.component';


@NgModule({
  declarations: [
    ReportBuilderComponent,
    KpiEditorComponent,
    StatusRendererComponent,
    VerticaldotRendererComponent,
    WifiUtilityComponent,
    CreateKpiComponent,
    CreateReportComponent,
    AddGroupPopupComponent,
    conditionalDropdownRendererComponent,
    DeleteRendererComponent,
    DeleteCreatedKpiRendererComponent,
    dropdownRendererComponent,
    createKpiDropdownRendererComponent,
    ComputationSettingsPoupComponent,
    IfElsePopupComponent,
    HextodocPopupComponent,
    MyPerformanceReportsComponent,
    ViewSummaryComponent,
    ChangeImpactAnalysisComponent,
    CustomTooltip,
    CeilingPopupComponent,
    InfoPopupComponent,
    FloorPopupComponent,
    AlarmDetailsPopupComponent
  ],
  imports: [
    CommonModule,
    PerformanceManagementRoutingModule,
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
    ChangeImpactAnanlysisModule
  ],
  exports: [
    KpiEditorComponent,
    StatusRendererComponent,
    VerticaldotRendererComponent,
    conditionalDropdownRendererComponent,
    DeleteRendererComponent,
    createKpiDropdownRendererComponent,
    DeleteCreatedKpiRendererComponent,
    dropdownRendererComponent
  ],
  entryComponents: [
    AddGroupPopupComponent, AlarmDetailsPopupComponent
  ],
  providers: []
})
export class PerformanceManagementModule { }

