import { NominalViewComponent } from './main-layer/sites/nominal/nominal-view/nominal-view.component';
import { inputRendererComponent } from './../core/components/ag-grid-renders/input-renderer.component';
import { SpiderViewComponent } from './main-layer/spider-view/spider-view.component';
import { colorDropdownRendererComponent } from './../core/components/ag-grid-renders/color-dropdown-renderer.component';
import { KpiSettingsComponent } from './main-layer/kpi-details/kpi-settings/kpi-settings.component';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MainModulesRoutingModule } from './main-modules-routing.module';

//Angular Material Components
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
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
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
import { FilterUniquePipe } from '../_pipes/filterUnique/filter-unique.pipe';
import { AgGridModule } from 'ag-grid-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SideNavService } from '../_services/side-nav.service';
import { MyReportsComponent } from './reports-dashboards/my-reports/my-reports.component';
import { ReportsWizardComponent } from './reports-dashboards/reports-wizard/reports-wizard.component';
import { CreateReportComponent } from './reports-dashboards/reports-wizard/create-report/create-report.component';
import { ButtonRendererComponent } from './reports-dashboards/my-reports/button-renderer.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ReportsDashboardsModule } from './reports-dashboards/reports-dashboards.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MainLayerComponent } from './main-layer/main-layer.component';
import '@geoman-io/leaflet-geoman-free';
import { MarkerService } from '../_services/leaflate/marker.service';
import { MyJcpComponent } from './my-jcp/my-jcp.component';
import { BackhaulViolatorsComponent } from './my-jcp/template-card-view/backhaul-violators/backhaul-violators.component';
import { CustomerExperienceComponent } from './my-jcp/template-card-view/customer-experience/customer-experience.component';
import { AlarmsComponent } from './my-jcp/template-card-view/alarms/alarms.component';
import { PerformanceComponent } from './my-jcp/template-card-view/performance/performance.component';
import { PlanningComponent } from './my-jcp/template-card-view/planning/planning.component';
import { WorkordersComponent } from './my-jcp/template-card-view/workorders/workorders.component';
import { TableViewControlComponent } from './main-layer/table-view-control/table-view-control.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PerformanceManagementModule } from './modules/performance-management/performance-management.module';
import { PlanningDeploymentModule } from './modules/planning-deployment/planning-deployment.module';
import { LegendsAndFilterComponent } from './main-layer/legends-and-filter/legends-and-filter.component';
import { Ng5SliderModule } from 'ng5-slider';
import { RfOcWorkordersModule } from './work-orders/rf-oc-workorders/rf-oc-workorders.module';
import { KpiDetailsComponent } from './main-layer/kpi-details/kpi-details.component';
import { KpiDetailsChartComponent } from './main-layer/kpi-details/kpi-details-chart/kpi-details-chart.component';

import { HighchartsChartModule } from "highcharts-angular";
import { ChartModule } from 'angular-highcharts';
import { SpiderViewDirective } from './main-layer/spider-view/spider-view.directive';
import { TreeNodeComponent } from './main-layer/spider-view/tree-node/tree-node.component';
import { AlarmsPopupComponent } from './main-layer/spider-view/tree-node/alarms-popup/alarms-popup.component';
import { CustomLegendsComponent } from './main-layer/legends-and-filter/custom-legends/custom-legends.component';
import { ScreenshotPreviewComponent } from './main-layer/screenshot-preview/screenshot-preview.component';
import { SelectedLayerMenuComponent } from './main-layer/selected-layer-menu/selected-layer-menu.component';
import { SpiderComponent } from './main-layer/sites/outdoor/spider/spider.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { KpiComponent } from './main-layer/sites/outdoor/spider/popup/kpi/kpi.component';
// import { NominalViewComponent } from './main-layer/sites/outdoor/spider/nominal-view/nominal-view.component';
import { TacNetworkDialogComponent } from './main-layer/location-and-boundaries/Network/TAL/tal-dialog/tal-dialog.component';
import { DenseUrbanDialogComponent } from './main-layer/location-and-boundaries/Morphology/DenseUrban/dense-urban-dialog/dense-urban-dialog.component';
import { TownBoundaryDialogComponent } from './main-layer/location-and-boundaries/CensusData/TownBoundary/town-boundary-dialog/town-boundary-dialog.component';
import { ZonesJioDialogComponent } from './main-layer/location-and-boundaries/Jio/Zones/zones-dialog/zones-dialog.component';
import { CandidatesComponent } from '../modules/components/properties/candidates/candidates.component';
import { NominalMacroDialogComponent } from './main-layer/sites/nominal/macro-dialog/macro-dialog.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { PinZoomComponent } from './main-layer/pin-zoom/pin-zoom.component';
import { CmcSettingsPopupComponent } from './main-layer/hybrid-layers/cmc-settings-popup/cmc-settings-popup.component';
import { PinGroupSettingComponent } from './main-layer/pin-group-setting/pin-group-setting.component';

@NgModule({
  declarations: [
    MyReportsComponent,
    ReportsWizardComponent,
    CreateReportComponent,
    ButtonRendererComponent,
    MainLayerComponent,
    MyJcpComponent,
    BackhaulViolatorsComponent,
    CustomerExperienceComponent,
    AlarmsComponent,
    PerformanceComponent,
    PlanningComponent,
    WorkordersComponent,
    TableViewControlComponent,
    LegendsAndFilterComponent,
    KpiDetailsComponent,
    KpiSettingsComponent,
    KpiDetailsChartComponent,
    SpiderViewDirective,
    TreeNodeComponent,
    AlarmsPopupComponent,
    CustomLegendsComponent,
    ScreenshotPreviewComponent,
    colorDropdownRendererComponent,
    inputRendererComponent,
    SelectedLayerMenuComponent,
    ScreenshotPreviewComponent,
    ScreenshotPreviewComponent,
    SpiderComponent,
    SpiderViewComponent,
    KpiComponent,
    CandidatesComponent,
    NominalViewComponent,
    TacNetworkDialogComponent,
    DenseUrbanDialogComponent,
    TownBoundaryDialogComponent,
    ZonesJioDialogComponent,
    CandidatesComponent,
    NominalMacroDialogComponent,
    CmcSettingsPopupComponent,
    PinZoomComponent,
    PinGroupSettingComponent
  ],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    MainModulesRoutingModule,
    CoreModule,
    HighchartsChartModule,
    ChartModule,
    FlexLayoutModule,
    ReportsDashboardsModule,
    LeafletModule,
    Ng5SliderModule,
    NgxDaterangepickerMd.forRoot(),
    AgGridModule.withComponents([ButtonRendererComponent, colorDropdownRendererComponent, inputRendererComponent]),
    //Angular material
    FormsModule,
    ReactiveFormsModule,
    A11yModule,
    // ClipboardModule,
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
    ColorPickerModule
  ], providers: [
    SideNavService,
    MarkerService,
    DatePipe,
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  exports: [
    MyReportsComponent,
    ReportsWizardComponent,
    MainLayerComponent,
    CreateReportComponent,
    ButtonRendererComponent,
    TableViewControlComponent,
    colorDropdownRendererComponent,
    inputRendererComponent
  ],
  entryComponents: [
    CreateReportComponent,
    TableViewControlComponent,
    SpiderComponent
  ]

})
export class MainModulesModule { }