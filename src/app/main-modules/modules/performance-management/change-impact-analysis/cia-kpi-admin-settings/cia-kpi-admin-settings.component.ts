import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridOptions, GridCore, GridApi } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commanPopup/common-popup/common-popup.component';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { ciaDropdownRenderersComponent } from '../renderer/cia-renderer.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cia-kpi-admin-settings',
  templateUrl: './cia-kpi-admin-settings.component.html',
  styleUrls: ['./cia-kpi-admin-settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CiaAdminSettingsComponent implements OnInit, OnDestroy {
  public columnDefs: any[];
  public sidenavBarStatus;
  public rowData: object;
  private gridApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public frameworkComponentsKpiSettings;
  gridColumnApi: any;
  public rowSelection;
  searchGrid = '';
  public showGlobalOperation: Boolean = false;
  messageSubscription: Subscription;

  colDefs = [
    {
      headerName: "Number of Days in Pre",
      field: "name",
      cellRenderer: function (params) {
        return params.rowIndex
      },
      width: 150,
      checkboxSelection: function (params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
      headerCheckboxSelection: function (params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
    },
    {
      headerName: "Days-Improvement/Degradation",
      width: 150,
      cellRenderer: 'dropdownRenderer'
    },
  ];

  public fitColumns() {
    if (this.gridOptions.api && this.rowData) {
      setTimeout(() => {
        this.gridOptions.api.sizeColumnsToFit();
      }, 500);
    }
  }

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public datashare: DataSharingService
  ) {
    this.gridOptions = <GridOptions>{};
    this.frameworkComponentsKpiSettings = {
      'dropdownRenderer': ciaDropdownRenderersComponent,
    };
    this.messageSubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
      this.fitColumns();
    });
  }

  ngOnInit(): void {
    this.createColumnDefs();
    this.getData();

  }

  get gridAPI(): GridApi {
    return this.gridApi;
  }

  private createColumnDefs() {
    this.columnDefs = this.colDefs;
  }

  onFilterChanged(value) {
    this.gridOptions.api.setQuickFilter(value);
  };

  public onReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    setTimeout(() => {
      this.fitColumns();
    }, 500);
  }

  private getData() {
    this.http.get("assets/data/modules/performance_management/change-impact-analysis/kpi-settings/kpi-settings.json")
      .subscribe(data => {
        this.rowData = data;
        this.fitColumns();
      });
  }

  openUpdateDialog(): void {
    const message = `Are you sure you want to update the Admin Settings?`;
    const image = 'warning';
    const snackbarMode = 'warning';
    const snackbarText = 'Admin Settings Updated Successfully.';
    const dialogData = new CommonDialogModel("Warning!", message, image, snackbarMode, snackbarText);
    const dialogRef = this.dialog.open(CommonPopupComponent, {
      data: dialogData
    });
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
