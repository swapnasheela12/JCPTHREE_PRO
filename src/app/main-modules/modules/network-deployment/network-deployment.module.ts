import { DeleteCreatedKpiRendererComponent } from './../../modules/performance-management/kpi-editor/renderer/delete-renderer.component';
import { createKpiDropdownRendererComponent } from './../../modules/performance-management/kpi-editor/renderer/dropdown-renderer.component';
import { dropdownRendererComponent } from './../../modules/performance-management/report-builder/create-report/renderer/dropdown-renderer.component';
import { DeleteRendererComponent } from 'src/app/core/components/ag-grid-renders/delete-renderer.component';
import { conditionalDropdownRendererComponent } from './../../modules/performance-management/report-builder/create-report/renderer/conditional-dropdown-renderer.component';
import { VerticaldotRendererComponent } from './../../modules/performance-management/kpi-editor/renderer/verticaldot-renderer.component';
import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { CustomTooltip } from './../../modules/performance-management/my-performance-reports/custom-tooltip.component';
import { CoreModule } from './../../../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HighchartsChartModule } from "highcharts-angular";
import { ChartModule } from 'angular-highcharts';
import { A11yModule } from "@angular/cdk/a11y";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkStepperModule, STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
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
import { NetworkDeploymentRoutingModule } from './network-deployment-routing.module';
import { TaskDetailsComponent } from './gNodeB/task-details/task-details.component';
import { SiteDatabaseComponent } from './gNodeB/site-database/site-database.component';
import { IconRendererComponent } from '../../work-orders/cm-workorders/ret-change/icon-renderer.component';
import { DropDownRendererComponent } from './gNodeB/task-details/dropDown-renderer.component';
import { SapIdDetailsComponent } from './gNodeB/task-details/sap-id-details/sap-id-details.component';
import { AssignTaskComponent } from './gNodeB/task-details/assign-task/assign-task.component';
import { SiteIdDetailComponent } from './gNodeB/site-database/site-id-detail/site-id-detail.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RfiSurveyFormComponent } from './gNodeB/site-database/rfi-survey-form/rfi-survey-form.component';
import { CommentHighlightFieldDirective } from 'src/app/core/components/comment-highlight-field/comment-highlight-field.directive';
import { CommentHighlightFieldComponent } from 'src/app/core/components/comment-highlight-field/comment-highlight-field.component';
import { AddCommentComponent } from 'src/app/core/components/comment-highlight-field/add-comment/add-comment.component';
import { InputCommentWidgetComponent } from 'src/app/core/components/input-comment-widget/input-comment-widget.component';
import { HoldSiteComponent } from './gNodeB/task-details/hold-site/hold-site.component';
import { TaskAssignmentComponent } from './gNodeB/task-details/task-assignment/task-assignment.component';
import { HoldDuringConstructionComponent } from './gNodeB/task-details/hold-during-construction/hold-during-construction.component';
import { RejectTaskComponent } from './gNodeB/task-details/reject-task/reject-task.component';
import { UploadedFileViewerComponent } from './gNodeB/task-details/uploaded-file-viewer/uploaded-file-viewer.component';
import { RejectFormComponent } from './gNodeB/task-details/reject-form/reject-form.component';
import { AssignExternalUsersComponent } from './gNodeB/task-details/assign-external-users/assign-external-users.component';
import { SavedRejectionWidgetComponent } from 'src/app/core/components/saved-rejection-widget/saved-rejection-widget.component';
import { SiteHistoryDetailsComponent } from './gNodeB/site-database/site-id-detail/site-history-details/site-history-details.component';
import { ImageViewerRendererComponent } from './gNodeB/site-database/renderer/image-viewer-renderer.component';
import { DocumentRendererComponent } from './gNodeB/site-database/renderer/document-renderer.component';
import { DocumentViewerComponent } from './gNodeB/task-details/document-viewer/document-viewer.component';
import { RfiSurveyFormRendererComponent } from './gNodeB/site-database/renderer/rfi-survey-form-renderer.component';

//ODSC Components
import { OdscRfiSurveyFormComponent } from './odsc/site-database/rfi-survey-form/odsc-rfi-survey-form.component';
import { OdscSiteDatabaseComponent } from './odsc/site-database/odsc-site-database.component';
import { OdscSiteHistoryDetailsComponent } from './odsc/site-database/site-id-detail/site-history-details/odsc-site-history-details.component';
import { OdscSiteIdDetailComponent } from './odsc/site-database/site-id-detail/odsc-site-id-detail.component';

@NgModule({
  declarations: [
    TaskDetailsComponent,
    SiteDatabaseComponent,
    DropDownRendererComponent,
    SapIdDetailsComponent,
    AssignTaskComponent,
    RejectTaskComponent,
    SiteIdDetailComponent,
    RfiSurveyFormComponent,
    CommentHighlightFieldDirective,
    CommentHighlightFieldComponent,
    AddCommentComponent,
    InputCommentWidgetComponent,
    HoldSiteComponent,
    TaskAssignmentComponent,
    HoldDuringConstructionComponent,
    UploadedFileViewerComponent,
    RejectFormComponent,
    AssignExternalUsersComponent,
    SavedRejectionWidgetComponent,
    SiteHistoryDetailsComponent,
    ImageViewerRendererComponent,
    DocumentRendererComponent,
    DocumentViewerComponent,
    RfiSurveyFormRendererComponent,
    RfiSurveyFormComponent,
    OdscRfiSurveyFormComponent,
    OdscSiteDatabaseComponent,
    OdscSiteHistoryDetailsComponent,
    OdscSiteIdDetailComponent
  ],
  imports: [
    CommonModule,
    NetworkDeploymentRoutingModule,
    CoreModule,
    FlexLayoutModule,
    NgxDaterangepickerMd.forRoot(),
    AgGridModule.withComponents([CustomTooltip, StatusRendererComponent, VerticaldotRendererComponent,
      conditionalDropdownRendererComponent, DeleteRendererComponent, createKpiDropdownRendererComponent,
      DeleteCreatedKpiRendererComponent, IconRendererComponent, DropDownRendererComponent,
      ImageViewerRendererComponent, RfiSurveyFormRendererComponent]),
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
    NgxMatSelectSearchModule,
    CarouselModule,
    MDBBootstrapModule,
    MDBBootstrapModule.forRoot(),
    CarouselModule.forRoot(),
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }]
})
export class NetworkDeploymentModule { }

