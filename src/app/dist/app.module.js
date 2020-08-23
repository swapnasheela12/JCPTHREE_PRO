"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var http_1 = require("@angular/common/http");
// used to create fake backend
var _helpers_1 = require("./_helpers");
var _helpers_2 = require("./_helpers");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var login_jcp_three_component_1 = require("./login-jcp-three/login-jcp-three.component");
var home_jcp_three_component_1 = require("./home-jcp-three/home-jcp-three.component");
var animations_1 = require("@angular/platform-browser/animations");
var angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
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
// import { FilterUniquePipe } from './_pipes/filterUnique/filter-unique.pipe';
var click_outside_directive_1 = require("./_directive/click-outside.directive");
var core_module_1 = require("./core/core.module");
var ngx_daterangepicker_material_1 = require("ngx-daterangepicker-material");
var flex_layout_1 = require("@angular/flex-layout");
var ag_grid_angular_1 = require("ag-grid-angular");
var successful_component_1 = require("./core/components/commanPopup/successful/successful.component");
var side_nav_service_1 = require("./_services/side-nav.service");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var landing_home_component_1 = require("./home-jcp-three/landing-home/landing-home.component");
// import { HighchartsChartComponent } from 'highcharts-angular';
var highcharts_angular_1 = require("highcharts-angular");
var angular_highcharts_1 = require("angular-highcharts");
var ngx_leaflet_1 = require("@asymmetrik/ngx-leaflet");
// import { MainLayerComponent } from './main-layer/main-layer.component';
var marker_service_1 = require("./_services/leaflate/marker.service");
require("@geoman-io/leaflet-geoman-free");
var ngx_mat_select_search_1 = require("ngx-mat-select-search");
var settings_dialog_component_1 = require("./core/components/header/myjcpdropdownpanel/settings-dialog/settings-dialog.component");
var row_rendering_component_1 = require("./modules/components/row-rendering/row-rendering.component");
var column_rendering_component_1 = require("./modules/components/column-rendering/column-rendering.component");
var tree_rendering_component_1 = require("./modules/components/tree-rendering/tree-rendering.component");
var form_field_1 = require("@angular/material/form-field");
var overlay_1 = require("@angular/cdk/overlay");
var myjcp_settings_overlay_container_1 = require("./core/components/header/myjcpdropdownpanel/myjcp-settings-overlay-container");
var ng5_slider_1 = require("ng5-slider");
var ag_grid_row_rendering_component_1 = require("./modules/components/ag-grid-row-rendering/ag-grid-row-rendering.component");
var ag_grid_column_rendering_component_1 = require("./modules/components/ag-grid-column-rendering/ag-grid-column-rendering.component");
var ag_grid_tree_rendering_component_1 = require("./modules/components/ag-grid-tree-rendering/ag-grid-tree-rendering.component");
var alarms_popup_component_1 = require("../../src/app/modules/components/alarms-popup/alarms-popup.component");
var capacity_component_1 = require("../app/modules/components/capacity/capacity.component");
var configuration_component_1 = require("../app/modules/components/configuration/configuration.component");
var config_dotmenu_component_1 = require("./modules/components/config-dotmenu/config-dotmenu.component");
var question_popup_component_1 = require("./modules/components/capacity/question-popup/question-popup.component");
var history_popup_component_1 = require("./modules/components/configuration/history-popup/history-popup.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_jcp_three_component_1.LoginJcpThreeComponent,
                home_jcp_three_component_1.HomeJcpThreeComponent,
                click_outside_directive_1.ClickOutsideDirective,
                landing_home_component_1.LandingHomeComponent,
                settings_dialog_component_1.SettingsDialogComponent,
                row_rendering_component_1.RowRenderingComponent,
                column_rendering_component_1.ColumnRenderingComponent,
                tree_rendering_component_1.TreeRenderingComponent,
                // MainLayerComponent,
                row_rendering_component_1.ModalTemplateComponent,
                ag_grid_row_rendering_component_1.AgGridRowRenderingComponent,
                ag_grid_column_rendering_component_1.AgGridColumnRenderingComponent,
                ag_grid_tree_rendering_component_1.AgGridTreeRenderingComponent,
                alarms_popup_component_1.AlarmsPopupComponent,
                capacity_component_1.CapacityComponent,
                configuration_component_1.ConfigurationComponent,
                config_dotmenu_component_1.ConfigDotmenuComponent,
                question_popup_component_1.QuestionPopupComponent,
                history_popup_component_1.HistoryPopupComponent,
                configuration_component_1.ConfigurationComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                angular_highcharts_1.ChartModule,
                highcharts_angular_1.HighchartsChartModule,
                ng5_slider_1.Ng5SliderModule,
                ///////
                // NgxLoadingControlModule,
                ///////
                //modules
                ngx_leaflet_1.LeafletModule,
                core_module_1.CoreModule,
                flex_layout_1.FlexLayoutModule,
                ngx_daterangepicker_material_1.NgxDaterangepickerMd.forRoot(),
                ag_grid_angular_1.AgGridModule.withComponents([]),
                forms_1.ReactiveFormsModule,
                forms_2.FormsModule,
                http_1.HttpClientModule,
                //font
                angular_fontawesome_1.FontAwesomeModule,
                //Angular meterial
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
                ng_bootstrap_1.NgbModule,
                ngx_daterangepicker_material_1.NgxDaterangepickerMd,
                form_field_1.MatFormFieldModule,
                ngx_mat_select_search_1.NgxMatSelectSearchModule,
            ],
            providers: [
                { provide: http_1.HTTP_INTERCEPTORS, useClass: _helpers_2.BasicAuthInterceptor, multi: true },
                { provide: http_1.HTTP_INTERCEPTORS, useClass: _helpers_2.ErrorInterceptor, multi: true },
                { provide: overlay_1.OverlayContainer, useClass: myjcp_settings_overlay_container_1.AppOverlayContainer },
                // provider used to create fake backend
                _helpers_1.fakeBackendProvider,
                side_nav_service_1.SideNavService,
                marker_service_1.MarkerService
            ],
            bootstrap: [app_component_1.AppComponent],
            exports: [home_jcp_three_component_1.HomeJcpThreeComponent],
            entryComponents: [
                // CreateReportComponent,
                successful_component_1.SuccessfulComponent,
                settings_dialog_component_1.SettingsDialogComponent,
                row_rendering_component_1.ModalTemplateComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
