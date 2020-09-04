import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
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

import { AgGridModule } from 'ag-grid-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { RfOcWorkordersModuleRoutingModule } from './rf-oc-workorders-routing.module';
import { SectorMisalignmentComponent } from './category-wise-wo-listing/sector-misalignment/sector-misalignment.component';
//import { OvershootingCellComponent } from './category-wise-wo-listing/overshooting-cell/overshooting-cell.component';
// import { WoRanPopupComponent } from './category-wise-wo-listing/overshooting-cell/ran-popup/wo-ran-popup/wo-ran-popup.component';
import { CoreModule } from '../../../core/core.module';
import { WoSectorMisalignmentComponent } from './category-wise-wo-listing/sector-misalignment/wo-sector-misalignment/wo-sector-misalignment.component';
import { ExecutionTaskComponent } from './category-wise-wo-listing/sector-misalignment/wo-sector-misalignment/execution-task/execution-task.component';
import { dropDownThreeDotRendererComponent } from 'src/app/core/components/ag-grid-renders/dropDownThreeDot-renderer.component';
import { viewHistoryRendererComponent } from 'src/app/core/components/ag-grid-renders/view-history-renderer.component';
import { OvershootingCellComponent } from './category-wise-wo-listing/overshooting-cell/overshooting-cell.component';

import { OvershootingExeTaskComponent } from './category-wise-wo-listing/overshooting-cell/overshooting-exe-task/overshooting-exe-task.component';
import { IanLeadComponent } from './category-wise-wo-listing/overshooting-cell/ian-lead/ian-lead.component';
import { WoOvershootingCellComponent } from './category-wise-wo-listing/overshooting-cell/wo-overshooting-cell/wo-overshooting-cell.component';
import { TaskInputRendererComponent } from './category-wise-wo-listing/sector-misalignment/renderer/task-input-renderer.component';
import { TaskDropdownRendererComponent } from './category-wise-wo-listing/sector-misalignment/renderer/task-dropdown-renderer.component';
import { DropdownComponent } from './category-wise-wo-listing/overshooting-cell/renderer/wostatus/dropdown.component';
import { WostatusComponent } from './category-wise-wo-listing/overshooting-cell/renderer/wostatus/wostatus.component';

import { TextfieldComponent } from './category-wise-wo-listing/overshooting-cell/renderer/wostatus/textfield.component';
import { ExecutionTaskSaveComponent } from './category-wise-wo-listing/sector-misalignment/wo-sector-misalignment/execution-task/execution-task-save.component';
import { SubmitWorkordedPopupComponent } from './category-wise-wo-listing/overshooting-cell/submit-workorded-popup.component';
import { CellDecongestionComponent } from './category-wise-wo-listing/cell-decongestion/cell-decongestion.component';
//import { WoWidgetComponent } from './category-wise-wo-listing/common/widget/work-order-widget/wo-widget/wo-widget.component';
import { WoDecongestionComponent } from './category-wise-wo-listing/cell-decongestion/wo-decongestion/wo-decongestion.component';
import { CellExecutionTaskComponent } from './category-wise-wo-listing/cell-decongestion/wo-decongestion/execution-task/execution-task.component';


@NgModule({
  declarations: [
    SectorMisalignmentComponent,
    OvershootingCellComponent,
    ExecutionTaskComponent,
    ExecutionTaskSaveComponent,
    WoSectorMisalignmentComponent,

    TextfieldComponent,

    OvershootingExeTaskComponent,
    IanLeadComponent,
    WoOvershootingCellComponent,
    TaskDropdownRendererComponent,
    TaskInputRendererComponent,
    DropdownComponent,
    WostatusComponent,
    SubmitWorkordedPopupComponent,
    CellDecongestionComponent,
    //WoWidgetComponent,
    WoDecongestionComponent,
    CellExecutionTaskComponent
  ],
  imports: [
    RfOcWorkordersModuleRoutingModule,
    CommonModule,
    CoreModule,
    // RouterModule,
    FlexLayoutModule,
    NgxDaterangepickerMd.forRoot(),
    AgGridModule.withComponents([dropDownThreeDotRendererComponent, viewHistoryRendererComponent, TaskDropdownRendererComponent, TaskInputRendererComponent]),
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
  ],
  exports: [
  ],
  entryComponents: [
  ],
  providers: []
})
export class RfOcWorkordersModule { }

