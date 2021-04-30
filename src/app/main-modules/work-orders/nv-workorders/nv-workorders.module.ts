import { DeleteCreatedKpiRendererComponent } from './../../modules/performance-management/kpi-editor/renderer/delete-renderer.component';
import { createKpiDropdownRendererComponent } from './../../modules/performance-management/kpi-editor/renderer/dropdown-renderer.component';
import { dropdownRendererComponent } from './../../modules/performance-management/report-builder/create-report/renderer/dropdown-renderer.component';
import { DeleteRendererComponent } from 'src/app/core/components/ag-grid-renders/delete-renderer.component';
import { conditionalDropdownRendererComponent } from './../../modules/performance-management/report-builder/create-report/renderer/conditional-dropdown-renderer.component';
import { VerticaldotRendererComponent } from './../../modules/performance-management/kpi-editor/renderer/verticaldot-renderer.component';
import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { CustomTooltip } from './../../modules/performance-management/my-performance-reports/custom-tooltip.component';
import { CoreModule } from './../../../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { ThreeDotRETRenderer } from 'src/app/main-modules/work-orders/cm-workorders/ret-change/threedot-ret-renderer.component';

import { WebPerformanceTestComponent } from './web-performance-test/web-performance-test.component';
import { NvWorkordersRoutingModule } from './nv-workorders-routing.module';
import { CreateNewWorkorderComponent } from './web-performance-test/create-new-workorder/create-new-workorder.component';
import { ViewTasksComponent } from './web-performance-test/view-tasks/view-tasks.component';
import { WptModalComponent } from './web-performance-test/wpt-modal/wpt-modal.component';
import { ThreeDotWPTRenderer } from './web-performance-test/threedot-wpt-renderer.component';
import { WoFilterComponent } from './web-performance-test/wo-filter/wo-filter.component';
import { ViewWorkorderComponent } from './web-performance-test/view-workorder/view-workorder.component';
import { ThreeDotCreateNewRenderer } from './web-performance-test/threedot-create-new-renderer.component';
import { ThreeDotNVWPTRenderer } from './web-performance-test/threedot-nv-wpt-renderer.component';
import { RegulatoryComponent } from './regulatory/regulatory.component';
import { RecipeComponent } from './recipe/recipe.component';
import { OntComponent } from './ont/ont.component';


@NgModule({
  declarations: [WebPerformanceTestComponent,
    CreateNewWorkorderComponent,
    ViewTasksComponent,
    WptModalComponent,
    ThreeDotWPTRenderer,
    ThreeDotCreateNewRenderer,
    ThreeDotNVWPTRenderer,
    WoFilterComponent,
    ViewWorkorderComponent,
    RegulatoryComponent,
    RecipeComponent,
    OntComponent
  ],
  imports: [
    CommonModule,
    NvWorkordersRoutingModule,
    CoreModule,
    FlexLayoutModule,
    NgxDaterangepickerMd.forRoot(),
    AgGridModule.withComponents([ThreeDotNVWPTRenderer,ThreeDotWPTRenderer,ThreeDotCreateNewRenderer, CustomTooltip, StatusRendererComponent, VerticaldotRendererComponent, conditionalDropdownRendererComponent, DeleteRendererComponent, dropdownRendererComponent, createKpiDropdownRendererComponent, DeleteCreatedKpiRendererComponent, ThreeDotRETRenderer]),
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
  ]
})
export class NvWorkordersModule { }
