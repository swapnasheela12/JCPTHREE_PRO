import { FivegSpiderViewComponent } from './fiveg-spider-view/fiveg-spider-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { MainLayerRoutingModule } from './main-layer-routing.module';
import { A11yModule } from "@angular/cdk/a11y";
// import {ClipboardModule} from '@angular/cdk/clipboard';
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
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgGridModule } from 'ag-grid-angular';
import { Ng5SliderModule } from 'ng5-slider';
import { MainLayerComponent } from '../main-layer/main-layer.component';
import { KpiSettingsComponent } from '../main-layer/kpi-details/kpi-settings/kpi-settings.component';
import { TableViewControlComponent } from '../main-layer/table-view-control/table-view-control.component';
import { colorDropdownRendererComponent } from '../../core/components/ag-grid-renders/color-dropdown-renderer.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { LegendsAndFilterComponent } from '../main-layer/legends-and-filter/legends-and-filter.component';
import { CustomLegendsComponent } from '../main-layer/legends-and-filter/custom-legends/custom-legends.component';
import { ScreenshotPreviewComponent } from '../main-layer/screenshot-preview/screenshot-preview.component';
import { SelectedLayerMenuComponent } from '../main-layer/selected-layer-menu/selected-layer-menu.component';
import { KpiDetailsComponent } from '../main-layer/kpi-details/kpi-details.component';
import { KpiDetailsChartComponent } from '../main-layer/kpi-details/kpi-details-chart/kpi-details-chart.component';
import { HighchartsChartModule } from "highcharts-angular";
import { ChartModule } from 'angular-highcharts';
import '@geoman-io/leaflet-geoman-free';
import { inputRendererComponent } from '../../core/components/ag-grid-renders/input-renderer.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MarkerService } from 'src/app/_services/leaflate/marker.service';
import { LeftsideSettingsPopupComponent } from 'src/app/core/components/leftside-settings-popup/leftside-settings-popup.component';
import { SmallCellPlannedSpiderViewComponent } from './layer-list/sites/planned/small-cell-planned/small-cell-planned-spider-view/small-cell-planned-spider-view.component';
import { SpiderViewDirective } from './spider-view/spider-view.directive';
import { TacNetworkDialogComponent } from './layer-list/location-and-boundaries/Network/TAL/tal-dialog/tal-dialog.component';
import { DenseUrbanDialogComponent } from './layer-list/location-and-boundaries/Morphology/DenseUrban/dense-urban-dialog/dense-urban-dialog.component';
import { TownBoundaryDialogComponent } from './layer-list/location-and-boundaries/CensusData/TownBoundary/town-boundary-dialog/town-boundary-dialog.component';
import { ZonesJioDialogComponent } from './layer-list/location-and-boundaries/Jio/Zones/zones-dialog/zones-dialog.component';
import { CmcSettingsPopupComponent } from './layer-list/hybrid-layers/cmc-settings-popup/cmc-settings-popup.component';
import { PinZoomComponent } from './pin-zoom/pin-zoom.component';
import { PinGroupSettingComponent } from './pin-group-setting/pin-group-setting.component';
import { NominalMacroDialogComponent } from './layer-list/sites/nominal/macro-dialog/macro-dialog.component';
import { RouteReadyFibreCoreComponent } from './layer-list/topologies/fibre/route/route-ready-fibre-core/route-ready-fibre-core.component';
import { FibreRouteSettingsPopupComponent } from './layer-list/topologies/fibre/route/settings-popup/settings-popup.component';
import { TreeNodeComponent } from './spider-view/tree-node/tree-node.component';
import { AlarmsPopupComponent } from 'src/app/modules/components/alarms-popup/alarms-popup.component';
import { SpiderComponent } from './layer-list/sites/outdoor/spider/spider.component';
import { KpiComponent } from './layer-list/sites/outdoor/spider/popup/kpi/kpi.component';
import { CandidatesComponent } from 'src/app/modules/components/properties/candidates/candidates.component';
import { NominalViewComponent } from './layer-list/sites/nominal/nominal-view/nominal-view.component';

import { LogicaltopologyMultiSpiderViewComponent } from './layer-list/topologies/fibre/logicaltopology/logicaltopology-multi-spider-view/logicaltopology-multi-spider-view.component';
import { SpliterViewComponent } from './layer-list/topologies/fibre/logicaltopology/spliter-view/spliter-view.component';
import { RouteTableViewComponent } from './layer-list/topologies/fibre/route/route-table-view/route-table-view.component';
import { StructurePlannedSettingsPopupComponent } from './layer-list/topologies/structure/structure-planned-fibre-core/structure-planned-settings-popup/structure-planned-settings-popup.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FivegCircularSpiderViewComponent } from './fiveg-circular-spider-view/fiveg-circular-spider-view.component';
import { LogicalConnectivityComponent } from './layer-list/topologies/logical-connectivity/logical-connectivity.component';
import { FivegAdjacentSpiderViewComponent } from './fiveg-adjacent-spider-view/fiveg-adjacent-spider-view.component';
import { LogicalToplogySpiderViewComponent } from './layer-list/topologies/fibre/logicaltopology/logical-topology-spider-view/logical-topology-spider-view.component';
import { EquipmentComponent } from './layer-list/topologies/fibre/logicaltopology/logical-topology-spider-view/equipment/equipment.component';
import { StructureComponent } from './layer-list/topologies/fibre/logicaltopology/logical-topology-spider-view/structure/structure.component';
import { AnchorRendererComponent } from 'src/app/core/components/ag-grid-renders/anchor-renderer.component';
import { LogicalConnectivitySettingComponent } from './layer-list/topologies/fibre/logicaltopology/logical-connectivity-setting/logical-connectivity-setting.component';
import { PolygonEditorComponent } from './polygon-editor/polygon-editor.component';
import { SmartbenchMenubarComponent } from './network/quality-and-experience/smartbench-menubar/smartbench-menubar.component';
import { SplitmapComponent } from './network/quality-and-experience/splitmap/splitmap.component';
import { SmartbenchDialogComponent } from './network/quality-and-experience/smartbench-dialog/smartbench-dialog.component';


import { ToggleButtonRendererComponent } from 'src/app/core/components/ag-grid-renders/toggle-button-renderer.component';
import { AdditionalCandidatesPopupComponent, nominalGenerationRenderComponent, flagRenderComponent } from './additional-candidates-popup/additional-candidates-popup.component';
import { AdditionalCandidateSettingsPopupComponent } from './additional-candidate-settings-popup/additional-candidate-settings.component';
import { LayerPatchSettingsPopupComponent } from './layer-patch-settings-popup/layer-patch-settings.component';
import { LayerPatchPopupComponent } from './layer-patch-popup/layer-patch-popup.component';
import { DropdownOwnerRendererComponent } from '../administration/module-management/network-deployment/plan-to-build/gNodeB/site-sla-configuration/dropdown-owner-renderer.component';
import { DropdownResponsibleRendererComponent } from '../administration/module-management/network-deployment/plan-to-build/gNodeB/site-sla-configuration/dropdown-responsible-renderer.component';
import { DropdownPositionRendererComponent } from '../administration/module-management/network-deployment/plan-to-build/gNodeB/site-sla-configuration/dropdown-position-renderer.component';
import { PolygonSettingComponent } from './polygon-setting/polygon-setting.component';
import { NcLayerSettingsDialogComponent } from './layer-list/nominal-capacity/nc-layer-settings-dialog/nc-layer-settings-dialog.component';
import { PredictionSettingPopupComponent } from './prediction-setting-popup/prediction-setting-popup.component';

@NgModule({
  declarations: [
    MainLayerComponent,
    TableViewControlComponent,
    LegendsAndFilterComponent,
    KpiDetailsComponent,
    KpiSettingsComponent,
    KpiDetailsChartComponent,
    CustomLegendsComponent,
    ScreenshotPreviewComponent,
    colorDropdownRendererComponent,
    inputRendererComponent,
    SelectedLayerMenuComponent,
    LeftsideSettingsPopupComponent,
    SmallCellPlannedSpiderViewComponent,
    SpiderViewDirective,
    TacNetworkDialogComponent,
    DenseUrbanDialogComponent,
    TownBoundaryDialogComponent,
    ZonesJioDialogComponent,
    CmcSettingsPopupComponent,
    FibreRouteSettingsPopupComponent,
    PinZoomComponent,
    SpiderComponent,
    PinGroupSettingComponent,
    NominalMacroDialogComponent,
    RouteReadyFibreCoreComponent,
    RouteReadyFibreCoreComponent,
    KpiSettingsComponent,
    RouteTableViewComponent,
    TreeNodeComponent,
    AlarmsPopupComponent,
    KpiComponent,
    CandidatesComponent,
    NominalViewComponent,
    FivegSpiderViewComponent,
    LogicaltopologyMultiSpiderViewComponent,
    LogicalToplogySpiderViewComponent,
    SpliterViewComponent,
    StructurePlannedSettingsPopupComponent,
    FivegCircularSpiderViewComponent,
    LogicalConnectivityComponent,
    FivegAdjacentSpiderViewComponent,
    StructureComponent,
    EquipmentComponent,
    AnchorRendererComponent,
    LogicalConnectivitySettingComponent,
    PolygonEditorComponent,
    SmartbenchMenubarComponent,
    SplitmapComponent,
    SmartbenchDialogComponent,
    DropdownOwnerRendererComponent,
    DropdownResponsibleRendererComponent,
    DropdownPositionRendererComponent,
    ToggleButtonRendererComponent,
    AdditionalCandidatesPopupComponent,
    AdditionalCandidateSettingsPopupComponent,
    nominalGenerationRenderComponent,
    flagRenderComponent,
    LayerPatchSettingsPopupComponent,
    LayerPatchPopupComponent,
    PolygonSettingComponent,
    NcLayerSettingsDialogComponent,
    PredictionSettingPopupComponent
  ],
  imports: [
    DragDropModule,
    MainLayerRoutingModule,
    CommonModule,
    CoreModule,
    Ng5SliderModule,
    NgxDaterangepickerMd.forRoot(),
    AgGridModule.withComponents([
      colorDropdownRendererComponent,
      inputRendererComponent,
      AnchorRendererComponent,
      DropdownOwnerRendererComponent,
      DropdownResponsibleRendererComponent,
      DropdownPositionRendererComponent,
      ToggleButtonRendererComponent,
      nominalGenerationRenderComponent,
      flagRenderComponent
    ]),
    ColorPickerModule,
    FormsModule,
    ReactiveFormsModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
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
    Ng2SearchPipeModule,
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
    ChartModule,
    HighchartsChartModule,
    NgxMatSelectSearchModule,
    FlexLayoutModule
  ],
  providers: [
    MarkerService

  ],
  exports: [
    MainLayerComponent,
    TableViewControlComponent,
    colorDropdownRendererComponent,
    inputRendererComponent,
    AnchorRendererComponent,
    nominalGenerationRenderComponent,
    flagRenderComponent
  ], entryComponents: [
    TableViewControlComponent,
    SpiderComponent,
    StructurePlannedSettingsPopupComponent
  ]
})

export class MainLayerModule { }
