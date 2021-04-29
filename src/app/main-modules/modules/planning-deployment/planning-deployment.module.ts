import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningDeploymentRoutingModule } from './planning-deployment-routing.module';
import { EnbscComponent } from './enbsc/enbsc.component';
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
import { LinkBudgetComponent } from './link-budget/link-budget.component';
import { EditCellComponent } from './../../../_directive/edit-cell/edit-cell.component';
import { ViewModeDirective } from './../../../_directive/edit-cell/view-mode.directive';
import { EditModeDirective } from './../../../_directive/edit-cell/edit-mode.directive';
import { FocusableDirective } from './../../../_directive/focusable.directive';
import { EditOnEnterDirective } from './../../../_directive/edit-cell/edit-on-enter.directive';
import { NewAndSaveTemplatePopupComponent } from './link-budget/new-and-save-template-popup/new-and-save-template-popup.component';
import { NominalCapacityComponent } from './nominal-capacity/nominal-capacity.component';
import { CreateTaskPageComponent } from './nominal-capacity/create-task-page/create-task-page.component';
import { cnctDropdownRendererComponent } from './nominal-capacity/create-task-page/renderer/cnct-renderer.component';
import { ncCtTooltipComponent } from './nominal-capacity/create-task-page/renderer/nc-ct-tooltip.component';
import { NominalGenerationCoverageComponent } from './nominal-generation-coverage/nominal-generation-coverage.component';
import { NominalGenerationCreateComponent } from './nominal-generation-coverage/nominal-generation-create/nominal-generation-create.component';
import { PolygonPopupComponent } from './nominal-generation-coverage/polygon-popup/polygon-popup.component';
import { NominalGenerationLandingLayerComponent } from './nominal-generation-coverage/nominal-generation-landing-layer/nominal-generation-landing-layer.component';
import { NominalGenerationSummaryComponent } from './nominal-generation-coverage/nominal-generation-summary/nominal-generation-summary.component';
import { CoreModule } from 'src/app/core/core.module';
import { NominalSiteDistributionSummaryComponent, nominalSiteVerticalDotComponent, flagRenderComponent } from './nominal-generation-coverage/nominal-site-distribution-summary/nominal-site-distribution-summary.component';
import { MapHeaderViewComponent } from './nominal-generation-coverage/map-header-view/map-header-view.component';
import { NcDeleteHeaderRendererComponent } from './nominal-capacity/create-task-page/renderer/cnct-header-delete-renderer.component';
import { NominalGenerationPerformanceSummaryComponent } from './nominal-generation-coverage/nominal-generation-performance-summary/nominal-generation-performance-summary.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartModule } from 'angular-highcharts';
import { NpCreatePopupComponent } from './nominal-capacity/np-create-popup/np-create-popup.component';
import { NominalValidationComponent } from './nominal-validation/nominal-validation.component';
import { NominalValidationCreateComponent } from './nominal-validation/nominal-validation-create/nominal-validation-create.component';
import { NominalCapacityLayerComponent } from './nominal-capacity/nominal-capacity-layer/nominal-capacity-layer.component';
import { CompleteListPopupComponent } from './nominal-validation/complete-list-popup/complete-list-popup.component';
import { CoveredAreaLayerComponent } from './nominal-capacity/layer/covered-area-layer/covered-area-layer.component';
import { MacroLayerComponent } from './nominal-capacity/layer/macro-layer/macro-layer.component';
import { OdscLayerComponent } from './nominal-capacity/layer/odsc-layer/odsc-layer.component';
import { NominalValidationAdditionallayerComponent } from './nominal-validation/nominal-validation-additionallayer/nominal-validation-additionallayer.component';
import { NominalValidationSummaryComponent } from './nominal-validation/nominal-validation-summary/nominal-validation-summary.component';
import { NominalValidationPerformanceSummaryComponent } from './nominal-validation/nominal-validation-performance-summary/nominal-validation-performance-summary.component';
import { NominalValidationSiteDistributionSummaryComponent } from './nominal-validation/nominal-validation-site-distribution-summary/nominal-validation-site-distribution-summary.component';
import { NominalValidationOptimizationSummaryComponent } from './nominal-validation/nominal-validation-optimization-summary/nominal-validation-optimization-summary.component';
import { HoverComponentComponent } from './nominal-capacity/hover-component/hover-component.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { QueryAdministrationPopupComponent } from './nominal-capacity/create-task-page/poups/query-administration-popup/query-administration-popup.component';
// import { NcQueryAdministrationComponent } from './nominal-capacity/nc-query-administration/nc-query-administration.component';
// import { CreateQueryPageComponent } from './nominal-capacity/nc-query-administration/create-query-page/create-query-page.component';

@NgModule({
  declarations: [
    EnbscComponent,
    cnctDropdownRendererComponent,
    LinkBudgetComponent,
    EditCellComponent,
    ViewModeDirective,
    FocusableDirective,
    EditModeDirective,
    EditOnEnterDirective,
    NewAndSaveTemplatePopupComponent,
    NominalCapacityComponent,
    CreateTaskPageComponent,
    ncCtTooltipComponent,
    NominalGenerationCoverageComponent,
    NominalGenerationCreateComponent,
    PolygonPopupComponent,
    NominalGenerationLandingLayerComponent,
    NominalGenerationSummaryComponent,
    NominalSiteDistributionSummaryComponent,
    nominalSiteVerticalDotComponent,
    flagRenderComponent,
    MapHeaderViewComponent,
    NominalGenerationCoverageComponent,
    NominalGenerationCreateComponent,
    PolygonPopupComponent,
    NominalGenerationLandingLayerComponent,
    NominalGenerationSummaryComponent,
    NominalSiteDistributionSummaryComponent,
    nominalSiteVerticalDotComponent,
    flagRenderComponent,
    MapHeaderViewComponent,
    NcDeleteHeaderRendererComponent,
    NominalGenerationPerformanceSummaryComponent,
    NpCreatePopupComponent,
    NominalValidationComponent,
    NominalValidationCreateComponent,
    NominalCapacityLayerComponent,
    CompleteListPopupComponent,
    CoveredAreaLayerComponent,
    MacroLayerComponent,
    OdscLayerComponent,
    NominalValidationAdditionallayerComponent,
    NominalValidationSummaryComponent,
    NominalValidationPerformanceSummaryComponent,
    NominalValidationSiteDistributionSummaryComponent,
    NominalValidationOptimizationSummaryComponent,
    HoverComponentComponent,
    // QueryAdministrationPopupComponent,
    // NcQueryAdministrationComponent,
    // CreateQueryPageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    PlanningDeploymentRoutingModule,
    FlexLayoutModule,
    ChartModule,
    HighchartsChartModule,
    NgxDaterangepickerMd.forRoot(),
    AgGridModule.withComponents([
      cnctDropdownRendererComponent,
      ncCtTooltipComponent,
      NcDeleteHeaderRendererComponent,
      nominalSiteVerticalDotComponent,
      flagRenderComponent]),
    FormsModule,
    ReactiveFormsModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    Ng2SearchPipeModule,
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
  ],
  providers: [],
  exports: [
    EnbscComponent,
    cnctDropdownRendererComponent,
    NcDeleteHeaderRendererComponent,
    nominalSiteVerticalDotComponent,
    flagRenderComponent],
  entryComponents : [
    NewAndSaveTemplatePopupComponent,
    NominalGenerationLandingLayerComponent,
    NominalValidationAdditionallayerComponent
  ],
})
export class PlanningDeploymentModule { }
