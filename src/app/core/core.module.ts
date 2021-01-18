import { dropDownThreeDotRendererComponent } from './components/ag-grid-renders/dropDownThreeDot-renderer.component';
import { viewHistoryRendererComponent } from './components/ag-grid-renders/view-history-renderer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LeftsideNavigationComponent } from './components/leftside-navigation/leftside-navigation.component';
import { MmenuDirective } from '../_directive/mmenu.directive';

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
import { RouterModule } from '@angular/router';
import { SuccessfulComponent } from './components/commonPopup/successful/successful.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SideNavService } from '../_services/side-nav.service';
import { MyjcpdropdownpanelComponent } from './components/header/myjcpdropdownpanel/myjcpdropdownpanel.component';
import { isEllipsisActiveDirective } from '../_directive/is-ellipsis-active.directive';
import { ConfirmPopupComponent } from './components/commonPopup/confirm-popup/confirm-popup.component';
import { CommonPopupComponent } from './components/commonPopup/common-popup/common-popup.component';
import { AgGridModule } from 'ag-grid-angular';
import { FileUploadPopupComponent } from './components/commonPopup/file-upload-popup/file-upload-popup.component';
import { TableAgGridComponent } from './components/table-ag-grid/table-ag-grid.component';
import { AgGridTreeComponent } from './components/ag-grid-tree/ag-grid-tree.component';
import { TemplateDropdownComponent } from './../main-modules/modules/planning-deployment/link-budget/template-dropdown/template-dropdown.component';
import { DeleteRendererComponent } from './components/ag-grid-renders/delete-renderer.component';
import { SuccessfulModalComponent } from './components/commonPopup/successful-modal/successful-modal.component';
import { GenhelpiconComponent } from './components/ag-grid-renders/genhelpicon.component';
import { LeftsideSettingsPopupComponent } from './components/leftside-settings-popup/leftside-settings-popup.component';
import { PaginationComponent } from './components/commonPopup/pagination/pagination.component';
import { RedirectLayersPopupComponent } from './components/commonPopup/redirect-layers-popup/redirect-layers-popup.component';
import { SavePolygonPopupComponent } from './components/commonPopup/save-polygon-popup/save-polygon-popup.component';

@NgModule({
  declarations: [
    FilterUniquePipe,
    HeaderComponent,
    LeftsideNavigationComponent,
    MmenuDirective,
    SuccessfulComponent,
    SuccessfulModalComponent,
    MyjcpdropdownpanelComponent,
    isEllipsisActiveDirective,
    ConfirmPopupComponent,
    CommonPopupComponent,
    dropDownThreeDotRendererComponent,
    DeleteRendererComponent,
    GenhelpiconComponent,
    viewHistoryRendererComponent,
    FileUploadPopupComponent,
    TableAgGridComponent,
    AgGridTreeComponent,
    TemplateDropdownComponent,
    // LeftsideSettingsPopupComponent,
    PaginationComponent,
    RedirectLayersPopupComponent,
    SavePolygonPopupComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,

    AgGridModule.withComponents([dropDownThreeDotRendererComponent, viewHistoryRendererComponent, DeleteRendererComponent, GenhelpiconComponent]),
    //Angular meterial
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
    ScrollingModule
  ],
  providers: [
    SideNavService,
    MmenuDirective,
    isEllipsisActiveDirective
  ],
  exports: [
    HeaderComponent,
    LeftsideNavigationComponent,
    MmenuDirective,
    isEllipsisActiveDirective,
    SuccessfulComponent,
    SuccessfulModalComponent,
    dropDownThreeDotRendererComponent,
    viewHistoryRendererComponent,
    GenhelpiconComponent,
    TableAgGridComponent,
    AgGridTreeComponent,
    DeleteRendererComponent,
    PaginationComponent
  ], entryComponents: [
    SuccessfulComponent,
    SuccessfulModalComponent
  ]
})
export class CoreModule { }
