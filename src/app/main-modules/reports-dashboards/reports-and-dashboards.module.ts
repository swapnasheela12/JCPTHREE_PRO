import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReportsAndDashboardsRoutingModule } from './reports-and-dashboards-routing.module';
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
import { AgGridModule } from 'ag-grid-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Ng5SliderModule } from 'ng5-slider';
import { HighchartsChartModule } from "highcharts-angular";
import { ChartModule } from 'angular-highcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CoreModule } from 'src/app/core/core.module';
import { MyReportsComponent } from './my-reports/my-reports.component';
import { ReportsWizardComponent } from './reports-wizard/reports-wizard.component';
import { CreateReportComponent } from './reports-wizard/create-report/create-report.component';
import { ButtonRendererComponent } from './my-reports/button-renderer.component';
import { CustomDashboardComponent } from './custom-dashboard/custom-dashboard.component';
import { TwampLiveDashboardComponent } from './custom-dashboard/twamp-live-dashboard/twamp-live-dashboard.component';
import { InfoRendererComponent } from './custom-dashboard/renderer/info-renderer.component';
import { AllExpandRendererComponent } from './custom-dashboard/renderer/all-expand-renderer.component';
import { SideNavService } from 'src/app/_services/side-nav.service';
import { ZoomDataComponent } from './zoom-data/zoom-data.component';

import { TwampMgwBgwIntercircleComponent } from './custom-dashboard/twamp-mgw-bgw-intercircle/twamp-mgw-bgw-intercircle.component';
import { SlaConformanceComponent } from './custom-dashboard/sla-conformance/sla-conformance.component';
import { SlaConformanceNodewiseComponent } from './custom-dashboard/sla-conformance-nodewise/sla-conformance-nodewise.component';
import { TwampInterCircleComponent } from './custom-dashboard/twamp-inter-circle/twamp-inter-circle.component';
import { TwampNidMeasurementComponent } from './custom-dashboard/twamp-nid-measurement/twamp-nid-measurement.component';

@NgModule({
  declarations: [
    MyReportsComponent,
    ReportsWizardComponent,
    CreateReportComponent,
    ButtonRendererComponent,
    CustomDashboardComponent,
    TwampLiveDashboardComponent,
    InfoRendererComponent,
    ZoomDataComponent,
    SlaConformanceComponent,
    SlaConformanceNodewiseComponent,
    TwampInterCircleComponent,
    TwampNidMeasurementComponent,
    TwampMgwBgwIntercircleComponent
  ],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    ReportsAndDashboardsRoutingModule,
    CoreModule,
    HighchartsChartModule,
    ChartModule,
    FlexLayoutModule,
    ReportsAndDashboardsRoutingModule,
    Ng5SliderModule,
    NgxDaterangepickerMd.forRoot(),
    AgGridModule.withComponents([
      ButtonRendererComponent,
      InfoRendererComponent,
      AllExpandRendererComponent
    ]),
    FormsModule,
    ReactiveFormsModule,
    A11yModule,
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
    // MarkerService,
    DatePipe,
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  exports: [
    MyReportsComponent,
    ReportsWizardComponent,
    CreateReportComponent,
    ButtonRendererComponent,
  ],
  entryComponents: [
    CreateReportComponent,
  ]

})
export class ReportsAndDashboardsModule { }
