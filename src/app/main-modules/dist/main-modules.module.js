"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MainModulesModule = void 0;
var kpi_settings_component_1 = require("./main-layer/kpi-details/kpi-settings/kpi-settings.component");
var core_module_1 = require("./../core/core.module");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var main_modules_routing_module_1 = require("./main-modules-routing.module");
//Angular Material Components
var a11y_1 = require("@angular/cdk/a11y");
// import {ClipboardModule} from '@angular/cdk/clipboard';
var drag_drop_1 = require("@angular/cdk/drag-drop");
var portal_1 = require("@angular/cdk/portal");
var scrolling_1 = require("@angular/cdk/scrolling");
var stepper_1 = require("@angular/cdk/stepper");
var table_1 = require("@angular/cdk/table");
var tree_1 = require("@angular/cdk/tree");
var autocomplete_1 = require("@angular/material/autocomplete");
var badge_1 = require("@angular/material/badge");
var bottom_sheet_1 = require("@angular/material/bottom-sheet");
var button_1 = require("@angular/material/button");
var button_toggle_1 = require("@angular/material/button-toggle");
var card_1 = require("@angular/material/card");
var checkbox_1 = require("@angular/material/checkbox");
var chips_1 = require("@angular/material/chips");
var stepper_2 = require("@angular/material/stepper");
var datepicker_1 = require("@angular/material/datepicker");
var dialog_1 = require("@angular/material/dialog");
var divider_1 = require("@angular/material/divider");
var expansion_1 = require("@angular/material/expansion");
var grid_list_1 = require("@angular/material/grid-list");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var list_1 = require("@angular/material/list");
var menu_1 = require("@angular/material/menu");
var core_2 = require("@angular/material/core");
var paginator_1 = require("@angular/material/paginator");
var progress_bar_1 = require("@angular/material/progress-bar");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var radio_1 = require("@angular/material/radio");
var select_1 = require("@angular/material/select");
var sidenav_1 = require("@angular/material/sidenav");
var slider_1 = require("@angular/material/slider");
var slide_toggle_1 = require("@angular/material/slide-toggle");
var snack_bar_1 = require("@angular/material/snack-bar");
var sort_1 = require("@angular/material/sort");
var table_2 = require("@angular/material/table");
var tabs_1 = require("@angular/material/tabs");
var toolbar_1 = require("@angular/material/toolbar");
var tooltip_1 = require("@angular/material/tooltip");
var tree_2 = require("@angular/material/tree");
var forms_1 = require("@angular/forms");
// import { RouterModule } from '@angular/router';
// import { SuccessfulComponent } from './components/commanPopup/successful/successful.component';
var ag_grid_angular_1 = require("ag-grid-angular");
var flex_layout_1 = require("@angular/flex-layout");
var side_nav_service_1 = require("../_services/side-nav.service");
var my_reports_component_1 = require("./reports-dashboards/my-reports/my-reports.component");
var reports_wizard_component_1 = require("./reports-dashboards/reports-wizard/reports-wizard.component");
var create_report_component_1 = require("./reports-dashboards/reports-wizard/create-report/create-report.component");
var button_renderer_component_1 = require("./reports-dashboards/my-reports/button-renderer.component");
var ngx_daterangepicker_material_1 = require("ngx-daterangepicker-material");
var reports_dashboards_module_1 = require("./reports-dashboards/reports-dashboards.module");
// import { LayersModule } from './layers/layers.module';
var ngx_leaflet_1 = require("@asymmetrik/ngx-leaflet");
require("@geoman-io/leaflet-geoman-free");
var marker_service_1 = require("../_services/leaflate/marker.service");
var my_jcp_component_1 = require("./my-jcp/my-jcp.component");
var backhaul_violators_component_1 = require("./my-jcp/template-card-view/backhaul-violators/backhaul-violators.component");
var customer_experience_component_1 = require("./my-jcp/template-card-view/customer-experience/customer-experience.component");
var alarms_component_1 = require("./my-jcp/template-card-view/alarms/alarms.component");
var performance_component_1 = require("./my-jcp/template-card-view/performance/performance.component");
var planning_component_1 = require("./my-jcp/template-card-view/planning/planning.component");
var workorders_component_1 = require("./my-jcp/template-card-view/workorders/workorders.component");
var table_view_control_component_1 = require("./main-layer/table-view-control/table-view-control.component");
var ngx_mat_select_search_1 = require("ngx-mat-select-search");
var performance_management_module_1 = require("./modules/performance-management/performance-management.module");
var planning_deployment_module_1 = require("./modules/planning-deployment/planning-deployment.module");
var legends_and_filter_component_1 = require("./main-layer/legends-and-filter/legends-and-filter.component");
var ng5_slider_1 = require("ng5-slider");
var rf_oc_workorders_module_1 = require("./work-orders/rf-oc-workorders/rf-oc-workorders.module");
var kpi_details_component_1 = require("./main-layer/kpi-details/kpi-details.component");
var kpi_details_chart_component_1 = require("./main-layer/kpi-details/kpi-details-chart/kpi-details-chart.component");
var highcharts_angular_1 = require("highcharts-angular");
var angular_highcharts_1 = require("angular-highcharts");
var spider_view_component_1 = require("./main-layer/spider-view/spider-view.component");
var spider_view_directive_1 = require("./main-layer/spider-view/spider-view.directive");
var tree_node_component_1 = require("./main-layer/spider-view/tree-node/tree-node.component");
var alarms_popup_component_1 = require("./main-layer/spider-view/tree-node/alarms-popup/alarms-popup.component");
var screenshot_preview_component_1 = require("./main-layer/screenshot-preview/screenshot-preview.component");
var custom_legends_component_1 = require("./main-layer/legends-and-filter/custom-legends/custom-legends.component");
var MainModulesModule = /** @class */ (function () {
    function MainModulesModule() {
    }
    MainModulesModule = __decorate([
        core_1.NgModule({
            declarations: [
                // SuccessfulComponent
                my_reports_component_1.MyReportsComponent,
                reports_wizard_component_1.ReportsWizardComponent,
                create_report_component_1.CreateReportComponent,
                button_renderer_component_1.ButtonRendererComponent,
                //  MainLayerComponent,
                my_jcp_component_1.MyJcpComponent,
                backhaul_violators_component_1.BackhaulViolatorsComponent,
                customer_experience_component_1.CustomerExperienceComponent,
                alarms_component_1.AlarmsComponent,
                performance_component_1.PerformanceComponent,
                planning_component_1.PlanningComponent,
                workorders_component_1.WorkordersComponent,
                table_view_control_component_1.TableViewControlComponent,
                legends_and_filter_component_1.LegendsAndFilterComponent,
                kpi_details_component_1.KpiDetailsComponent,
                kpi_settings_component_1.KpiSettingsComponent,
                kpi_details_chart_component_1.KpiDetailsChartComponent,
                spider_view_component_1.SpiderViewComponent,
                spider_view_directive_1.SpiderViewDirective,
                tree_node_component_1.TreeNodeComponent,
                alarms_popup_component_1.AlarmsPopupComponent,
                custom_legends_component_1.CustomLegendsComponent,
                screenshot_preview_component_1.ScreenshotPreviewComponent
            ],
            imports: [
                common_1.CommonModule,
                main_modules_routing_module_1.MainModulesRoutingModule,
                core_module_1.CoreModule,
                highcharts_angular_1.HighchartsChartModule,
                angular_highcharts_1.ChartModule,
                // RouterModule,
                flex_layout_1.FlexLayoutModule,
                reports_dashboards_module_1.ReportsDashboardsModule,
                // LayersModule,
                ngx_leaflet_1.LeafletModule,
                ng5_slider_1.Ng5SliderModule,
                ngx_daterangepicker_material_1.NgxDaterangepickerMd.forRoot(),
                ag_grid_angular_1.AgGridModule.withComponents([button_renderer_component_1.ButtonRendererComponent]),
                //Angular meterial
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                a11y_1.A11yModule,
                // ClipboardModule,
                stepper_1.CdkStepperModule,
                table_1.CdkTableModule,
                tree_1.CdkTreeModule,
                drag_drop_1.DragDropModule,
                autocomplete_1.MatAutocompleteModule,
                badge_1.MatBadgeModule,
                bottom_sheet_1.MatBottomSheetModule,
                button_1.MatButtonModule,
                button_toggle_1.MatButtonToggleModule,
                card_1.MatCardModule,
                checkbox_1.MatCheckboxModule,
                chips_1.MatChipsModule,
                stepper_2.MatStepperModule,
                datepicker_1.MatDatepickerModule,
                dialog_1.MatDialogModule,
                divider_1.MatDividerModule,
                expansion_1.MatExpansionModule,
                grid_list_1.MatGridListModule,
                icon_1.MatIconModule,
                input_1.MatInputModule,
                list_1.MatListModule,
                menu_1.MatMenuModule,
                core_2.MatNativeDateModule,
                paginator_1.MatPaginatorModule,
                progress_bar_1.MatProgressBarModule,
                progress_spinner_1.MatProgressSpinnerModule,
                radio_1.MatRadioModule,
                core_2.MatRippleModule,
                select_1.MatSelectModule,
                sidenav_1.MatSidenavModule,
                slider_1.MatSliderModule,
                slide_toggle_1.MatSlideToggleModule,
                snack_bar_1.MatSnackBarModule,
                sort_1.MatSortModule,
                table_2.MatTableModule,
                tabs_1.MatTabsModule,
                toolbar_1.MatToolbarModule,
                tooltip_1.MatTooltipModule,
                tree_2.MatTreeModule,
                portal_1.PortalModule,
                scrolling_1.ScrollingModule,
                ngx_mat_select_search_1.NgxMatSelectSearchModule,
                performance_management_module_1.PerformanceManagementModule,
                planning_deployment_module_1.PlanningDeploymentModule,
                rf_oc_workorders_module_1.RfOcWorkordersModule
            ], providers: [
                side_nav_service_1.SideNavService,
                marker_service_1.MarkerService
            ],
            exports: [
                // HeaderComponent,
                // LeftsideNavigationComponent,
                // MmenuDirective,
                // SuccessfulComponent
                my_reports_component_1.MyReportsComponent,
                reports_wizard_component_1.ReportsWizardComponent,
                // MainLayerComponent,
                create_report_component_1.CreateReportComponent,
                button_renderer_component_1.ButtonRendererComponent,
                table_view_control_component_1.TableViewControlComponent,
            ],
            entryComponents: [
                create_report_component_1.CreateReportComponent,
                table_view_control_component_1.TableViewControlComponent
                // SuccessfulComponent
            ]
        })
    ], MainModulesModule);
    return MainModulesModule;
}());
exports.MainModulesModule = MainModulesModule;
