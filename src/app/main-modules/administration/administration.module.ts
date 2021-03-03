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
import { ReasonTemplatesComponent } from './reason-templates/reason-templates.component';
import { SiteSlaConfigurationComponent } from './site-sla-configuration/site-sla-configuration.component';
import { ConfigTemplateComponent } from './config-template/config-template.component';
import { StatusTemplateComponent } from './status-template/status-template.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import { CustomTooltip } from '../reports-dashboards/custom-dashboard/renderer/custom-tooltip.component';
import { StatusRendererComponent } from '../modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { VerticaldotRendererComponent } from '../modules/performance-management/kpi-editor/renderer/verticaldot-renderer.component';
import { conditionalDropdownRendererComponent } from '../modules/performance-management/report-builder/create-report/renderer/conditional-dropdown-renderer.component';
import { DeleteRendererComponent } from 'src/app/core/components/ag-grid-renders/delete-renderer.component';
import { dropdownRendererComponent } from '../modules/performance-management/report-builder/create-report/renderer/dropdown-renderer.component';
import { createKpiDropdownRendererComponent } from '../modules/performance-management/kpi-editor/renderer/dropdown-renderer.component';
import { DeleteCreatedKpiRendererComponent } from '../modules/performance-management/kpi-editor/renderer/delete-renderer.component';
import { CreateSlaConfigurationComponent } from './site-sla-configuration/create-sla-configuration/create-sla-configuration.component';
import { EditSlaConfigurationComponent } from './site-sla-configuration/edit-sla-configuration/edit-sla-configuration.component';
import { DropdownPositionRendererComponent } from './site-sla-configuration/dropdown-position-renderer.component';
import { DropdownOwnerRendererComponent } from './site-sla-configuration/dropdown-owner-renderer.component';
import { ToggleButtonRendererComponent } from 'src/app/core/components/ag-grid-renders/toggle-button-renderer.component';
import { CoreModule } from 'src/app/core/core.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ThreeDotP2BRenderer } from './renderer/threedot-p2b-renderer.component';
import { inputRendererComponent } from 'src/app/core/components/ag-grid-renders/input-renderer.component';
import { NpQueryAdministrationComponent } from './module-management/nominal-planning/np-query-administration/np-query-administration.component';
import { CreateQueryPageComponent } from './module-management/nominal-planning/np-query-administration/create-query-page/create-query-page.component';
import { QueryAdministrationPopupComponent } from './module-management/nominal-planning/np-query-administration/create-query-page/poups/query-administration-popup/query-administration-popup.component';
import { NpQueryThreeDotRendererComponent } from './module-management/nominal-planning/np-query-administration/create-query-page/np-query-three-dot-renderer/np-query-three-dot-renderer.component';

@NgModule({
  declarations: [ReasonTemplatesComponent, SiteSlaConfigurationComponent, ConfigTemplateComponent, StatusTemplateComponent, CreateSlaConfigurationComponent, EditSlaConfigurationComponent, ThreeDotP2BRenderer, NpQueryAdministrationComponent, CreateQueryPageComponent, QueryAdministrationPopupComponent, NpQueryThreeDotRendererComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    CoreModule,
    FlexLayoutModule,
    NgxDaterangepickerMd.forRoot(),
    AgGridModule.withComponents([CustomTooltip, StatusRendererComponent, VerticaldotRendererComponent,
       conditionalDropdownRendererComponent, DeleteRendererComponent, dropdownRendererComponent,
       createKpiDropdownRendererComponent, DeleteCreatedKpiRendererComponent, DropdownPositionRendererComponent,
        DropdownPositionRendererComponent, DropdownOwnerRendererComponent, ToggleButtonRendererComponent, inputRendererComponent,
        ThreeDotP2BRenderer, NpQueryThreeDotRendererComponent]),
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
    MatFormFieldModule,
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
  exports: [
    NpQueryThreeDotRendererComponent
  ],
})
export class AdministrationModule { }

