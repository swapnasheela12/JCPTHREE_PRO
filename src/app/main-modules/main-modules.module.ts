import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainModulesRoutingModule } from './main-modules-routing.module';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterUniquePipe } from '../_pipes/filterUnique/filter-unique.pipe';
// import { RouterModule } from '@angular/router';
// import { SuccessfulComponent } from './components/commanPopup/successful/successful.component';
import { AgGridModule } from 'ag-grid-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SideNavService } from '../_services/side-nav.service';
import { MyReportsComponent } from './reports-dashboards/my-reports/my-reports.component';
import { ReportsWizardComponent } from './reports-dashboards/reports-wizard/reports-wizard.component';
import { CreateReportComponent } from './reports-dashboards/reports-wizard/create-report/create-report.component';
import { ButtonRendererComponent } from './reports-dashboards/my-reports/button-renderer.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ReportsDashboardsModule } from './reports-dashboards/reports-dashboards.module';
// import { LayersModule } from './layers/layers.module';
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


@NgModule({
  declarations: [
    // SuccessfulComponent
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
  
  ],
  imports: [
    CommonModule,
    MainModulesRoutingModule,
    // RouterModule,
    FlexLayoutModule,
    ReportsDashboardsModule,
    // LayersModule,
    LeafletModule,
    NgxDaterangepickerMd.forRoot(),
    AgGridModule.withComponents([ButtonRendererComponent]),

    //Angular meterial
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
    NgxMatSelectSearchModule
  ], providers: [
    SideNavService,
    MarkerService
  ],
  exports: [
    // HeaderComponent,
    // LeftsideNavigationComponent,
    // MmenuDirective,
    // SuccessfulComponent
    MyReportsComponent,
    ReportsWizardComponent,
    MainLayerComponent,
    CreateReportComponent,
    ButtonRendererComponent,
    TableViewControlComponent
  ],
  entryComponents: [
    CreateReportComponent,
    TableViewControlComponent
    // SuccessfulComponent
  ]

})
export class MainModulesModule { }
