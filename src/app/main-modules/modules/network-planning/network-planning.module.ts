import { dropDownList3DotRendererComponent } from './../../../core/components/ag-grid-renders/dropDownList3DotRenderer.component';
import { dropdownPriorityRendererComponent } from './../../../core/components/ag-grid-renders/dropdown-priority-renderer.component';
import { dropdownQueryRendererComponent } from './../../../core/components/ag-grid-renders/dropdown-query-renderer.component';
import { statusflagiconRenderComponent } from './../../../core/components/ag-grid-renders/statusflagicon.component';
import { layerlayerDropDownDotRendererComponent } from './../../../core/components/ag-grid-renders/layerDropDownThreeDot-renderer.component';
import { AdDirective } from './../../../_directive/dynamicComponent/ad.directive';
import { DeleteCreatedKpiRendererComponent } from './../performance-management/kpi-editor/renderer/delete-renderer.component';
import { createKpiDropdownRendererComponent } from './../performance-management/kpi-editor/renderer/dropdown-renderer.component';
import { dropdownRendererComponent } from './../performance-management/report-builder/create-report/renderer/dropdown-renderer.component';
import { DeleteRendererComponent } from 'src/app/core/components/ag-grid-renders/delete-renderer.component';
import { conditionalDropdownRendererComponent } from './../performance-management/report-builder/create-report/renderer/conditional-dropdown-renderer.component';
import { VerticaldotRendererComponent } from './../performance-management/kpi-editor/renderer/verticaldot-renderer.component';
import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { CustomTooltip } from './../../reports-dashboards/custom-dashboard/renderer/custom-tooltip.component';
import { CoreModule } from 'src/app/core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetworkPlanningRoutingModule } from './network-planning-routing.module';
import { CreatePageComponent } from './rf-planning/nominal-generation-strategy/create-page/create-page.component';

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
import { StatergeMapNominalComponent } from './rf-planning/nominal-generation-strategy/create-page/staterge-map-nominal/staterge-map-nominal.component';
import { CandidatesACPComponent } from './rf-planning/nominal-generation-strategy/create-page/candidates-acp/candidates-acp.component';

@NgModule({
  declarations: [CreatePageComponent, StatergeMapNominalComponent,AdDirective, CandidatesACPComponent],
  imports: [
    CommonModule,
    NetworkPlanningRoutingModule,

    CoreModule,
    FlexLayoutModule,
    NgxDaterangepickerMd.forRoot(),
    AgGridModule.withComponents([dropDownList3DotRendererComponent,dropdownPriorityRendererComponent,CustomTooltip ,dropdownQueryRendererComponent,dropdownRendererComponent,statusflagiconRenderComponent,layerlayerDropDownDotRendererComponent,StatusRendererComponent, VerticaldotRendererComponent, conditionalDropdownRendererComponent, DeleteRendererComponent, dropdownRendererComponent, createKpiDropdownRendererComponent, DeleteCreatedKpiRendererComponent]),
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
    NgxMatSelectSearchModule
  ]
})
export class NetworkPlanningModule { }
