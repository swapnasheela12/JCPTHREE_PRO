import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// used to create fake backend
import { fakeBackendProvider } from "./_helpers";
import { BasicAuthInterceptor, ErrorInterceptor } from "./_helpers";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginJcpThreeComponent } from "./login-jcp-three/login-jcp-three.component";
import { HomeJcpThreeComponent } from "./home-jcp-three/home-jcp-three.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import * as _ from "lodash";

//Angular Material Components
import { A11yModule } from "@angular/cdk/a11y";
// import {ClipboardModule} from '@angular/cdk/clipboard';
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
// import { FilterUniquePipe } from './_pipes/filterUnique/filter-unique.pipe';
import { ClickOutsideDirective } from './_directive/click-outside.directive';
import { CoreModule } from './core/core.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgGridModule } from 'ag-grid-angular';
import { SuccessfulComponent } from './core/components/commanPopup/successful/successful.component';
import { SideNavService } from './_services/side-nav.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { MyReportsComponent } from './main-modules/reports-dashboards/my-reports/my-reports.component';
// import { ReportsWizardComponent } from './main-modules/reports-dashboards/reports-wizard/reports-wizard.component';
// import { CreateReportComponent } from './main-modules/reports-dashboards/reports-wizard/create-report/create-report.component';
// import { ButtonRendererComponent } from './main-modules/reports-dashboards/my-reports/button-renderer.component';
import { MainModulesModule } from './main-modules/main-modules.module';
import { LandingHomeComponent } from './home-jcp-three/landing-home/landing-home.component';
// import { HighchartsChartComponent } from 'highcharts-angular';
import { HighchartsChartModule } from "highcharts-angular";
import { ChartModule } from 'angular-highcharts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
// import { MainLayerComponent } from './main-layer/main-layer.component';
import { MarkerService } from './_services/leaflate/marker.service';
import '@geoman-io/leaflet-geoman-free';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SettingsDialogComponent } from './core/components/header/myjcpdropdownpanel/settings-dialog/settings-dialog.component';
import { RowRenderingComponent, ModalTemplateComponent } from './modules/components/row-rendering/row-rendering.component';
import { ColumnRenderingComponent } from './modules/components/column-rendering/column-rendering.component';
import { TreeRenderingComponent } from './modules/components/tree-rendering/tree-rendering.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AppOverlayContainer } from './core/components/header/myjcpdropdownpanel/myjcp-settings-overlay-container';
import { Ng5SliderModule } from 'ng5-slider';
import { AgGridRowRenderingComponent } from './modules/components/ag-grid-row-rendering/ag-grid-row-rendering.component';
import { AgGridColumnRenderingComponent } from './modules/components/ag-grid-column-rendering/ag-grid-column-rendering.component';
import { AgGridTreeRenderingComponent } from './modules/components/ag-grid-tree-rendering/ag-grid-tree-rendering.component';

declare var $: any;

@NgModule({
  declarations: [
    AppComponent,
    LoginJcpThreeComponent,
    HomeJcpThreeComponent,
    ClickOutsideDirective,
    LandingHomeComponent,
    SettingsDialogComponent,
    RowRenderingComponent,
    ColumnRenderingComponent,
    TreeRenderingComponent,
    // MainLayerComponent,
    ModalTemplateComponent,
    AgGridRowRenderingComponent,
    AgGridColumnRenderingComponent,
    AgGridTreeRenderingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartModule,
    HighchartsChartModule,
    Ng5SliderModule,

    ///////
    // NgxLoadingControlModule,
    ///////

    //modules
    LeafletModule,
    CoreModule,
    FlexLayoutModule,


    NgxDaterangepickerMd.forRoot(),
    AgGridModule.withComponents([]),

    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,


    //font
    FontAwesomeModule,

    //Angular meterial
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
    NgbModule,
    NgxDaterangepickerMd,
    MatFormFieldModule,
    NgxMatSelectSearchModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: OverlayContainer, useClass: AppOverlayContainer },
    // provider used to create fake backend
    fakeBackendProvider,
    SideNavService,
    MarkerService
  ],
  bootstrap: [AppComponent],
  exports: [HomeJcpThreeComponent],
  entryComponents: [
    // CreateReportComponent,
    SuccessfulComponent,
    SettingsDialogComponent,
    ModalTemplateComponent
  ]
})
export class AppModule { }
