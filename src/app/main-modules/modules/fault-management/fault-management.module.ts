// import { AlarmSummaryTableAllComponent } from './alarm-summary/table-view/alarm-summary-table-all/alarm-summary-table-all.component';
import { AlarmSummaryChartExpandComponent } from './alarm-summary/chart-view/alarm-summary-chart-expand/alarm-summary-chart-expand.component';
import { AlarmSummaryTableComponent } from './alarm-summary/table-view/alarm-summary-table/alarm-summary-table.component';
import { AlarmSummaryChartComponent } from './alarm-summary/chart-view/alarm-summary-chart/alarm-summary-chart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaultManagementRoutingModule } from './fault-management-routing.module';
import { ActiveAlarmComponent } from './active-alarm/active-alarm.component';
//import { ActiveLibraryComponent } from './active-library/active-library.component';

import { CoreModule } from './../../../core/core.module';

import { threeDotActiveAlarmRendererComponent } from './active-alarm/threedot-active-alarm-renderer.component';
import { threeDotActiveLibraryRendererComponent } from './active-library/threedot-active-library-renderer.component';

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

import { ActiveLibraryComponent } from './active-library/active-library.component';
import { AddAlarmComponent } from './add-alarm/add-alarm.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlarmSummaryComponent } from './alarm-summary/alarm-summary.component';
import { AlarmSummaryTableExpandComponent } from './alarm-summary/table-view/alarm-summary-table-expand/alarm-summary-table-expand.component';
import { HistoryAlarmChartComponent } from './alarm-summary/history-alarm/chart-view/history-alarm-chart/history-alarm-chart.component';
import { HistoryAlarmExpandChartComponent } from './alarm-summary/history-alarm/chart-view/history-alarm-expand-chart/history-alarm-expand-chart.component';
import { HistoryAlarmTableComponent } from './alarm-summary/history-alarm/table-view/history-alarm-table/history-alarm-table.component';
import { HistoryAlarmExpandTableComponent } from './alarm-summary/history-alarm/table-view/history-alarm-expand-table/history-alarm-expand-table.component';
import { HistoryAlarmComponent } from './alarm-summary/history-alarm/history-alarm.component';
import { EditComponent } from './active-library/edit/edit.component';
import { AlarmHistoryComponent } from './active-alarm/alarm-history/alarm-history.component';
import { InformationComponent } from './active-alarm/information/information.component';
// import { HeaderOfWidgetsComponent } from './alarm-summary/header-of-widgets/header-of-widgets.component';
// import { AlarmSummaryChartComponent } from './alarm-summary/alarm-summary-chart/alarm-summary-chart.component';
// import { AlarmSummaryChartExpandComponent } from './alarm-summary/alarm-summary-chart/alarm-summary-chart-expand/alarm-summary-chart-expand.component';
//import { ActiveAlarmMenuComponent } from './active-alarm-renderer/active-alarm-menu.component';
// import { AlarmSummaryTableComponent } from './alarm-summary/alarm-summary-chart/alarm-summary-table/alarm-summary-table.component';
// import { AlarmSummaryTableAllComponent } from './alarm-summary/alarm-summary-chart/alarm-summary-table-all/alarm-summary-table-all.component';
@NgModule({
  declarations: [threeDotActiveLibraryRendererComponent, threeDotActiveAlarmRendererComponent,ActiveAlarmComponent, ActiveLibraryComponent, AddAlarmComponent, AlarmSummaryComponent, AlarmSummaryChartComponent, AlarmSummaryTableComponent, AlarmSummaryChartExpandComponent, AlarmSummaryTableExpandComponent, HistoryAlarmChartComponent, HistoryAlarmExpandChartComponent, HistoryAlarmTableComponent, HistoryAlarmExpandTableComponent, HistoryAlarmComponent, EditComponent, AlarmHistoryComponent, InformationComponent],
  imports: [
    CoreModule,
    FlexLayoutModule,
    NgxDaterangepickerMd.forRoot(),
    AgGridModule.withComponents([threeDotActiveLibraryRendererComponent, threeDotActiveAlarmRendererComponent]),
    CommonModule,
    FaultManagementRoutingModule,
    A11yModule,
    ChartModule,
    HighchartsChartModule,

    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,

    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,

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
    AgGridModule,
    MatFormFieldModule,
    MatInputModule,
    CoreModule,
    NgxMatSelectSearchModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule  ]
})
export class FaultManagementModule { }
