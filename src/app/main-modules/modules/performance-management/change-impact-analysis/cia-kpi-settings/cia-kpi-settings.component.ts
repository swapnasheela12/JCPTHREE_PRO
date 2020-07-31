import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridOptions, GridCore, SelectionChangedEvent, GridApi } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commanPopup/common-popup/common-popup.component';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { ciaDropdownRenderersComponent } from '../renderer/cia-renderer.component';

@Component({
  selector: 'app-cia-kpi-settings',
  templateUrl: './cia-kpi-settings.component.html',
  styleUrls: ['./cia-kpi-settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CiaKpiSettingsComponent implements OnInit {
  public columnDefs: any[];
  public rowData: any;
  private gridApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public frameworkComponentsKpiSettings;
  gridColumnApi: any;
  public rowSelection;
  show: any;
  searchGrid = '';
  public showGlobalOperation:Boolean = false;
  public dataTest: any;

  HEADER_KPI = [
    {
      headerName: "Name",
      field: "name",
      tooltipField: 'name',
      width: 350,
      pinned:'left',
      checkboxSelection: function(params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
      headerCheckboxSelection: function(params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
    }, 
    {
      headerName: "Node",
      field: "node",
      width: 150
    }, 
    {
      headerName: "Domain",
      field: "domain",
      width: 150
    }, 
    {
      headerName: "Vendor",
      field: "vendor", 
      width: 150
    }, 
    {
      headerName: "%Change Improvement",
      width: 220,
      cellRenderer: 'dropdownRenderer',
    },
    {
      headerName: "CIA Module",
      width: 180,
      cellRenderer: 'dropdownRenderer',
    },
    {
      headerName: "Custom Module",
      width: 180,
      cellRenderer: 'dropdownRenderer',
    },
  ];

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public datashare: DataSharingService
  ) {
    this.gridOptions = <GridOptions>{};
    this.frameworkComponentsKpiSettings = {
      'dropdownRenderer':   ciaDropdownRenderersComponent,
    };
    this.datashare.chechboxChangeMessage(this.showGlobalOperation);
  }

  ngOnInit(): void {
    this.createColumnDefs();
    this.getData();

  }

  get gridAPI(): GridApi {
    return this.gridApi;
  }

  private createColumnDefs() {
    this.columnDefs = this.HEADER_KPI;
  }

  toggleSearch() {
    this.show = !this.show;
  };

  onFilterChanged(value) {
    this.gridOptions.api.setQuickFilter(value);
  };

  public onReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  private getData() {
    this.http.get("assets/data/modules/performance_management/change-impact-analysis/kpi-settings/kpi-settings.json")
      .subscribe(data => {
        this.rowData = data;
    });
  }

  openBulkDeleteDialog():void {
    const message = `Are you Sure you want to perform this action?`;
    const image = 'warning';
    const snackbarMessage = 'asdadasd';
    const dialogData = new CommonDialogModel("Warning!", message, image, snackbarMessage);    const dialogRef = this.dialog.open(CommonPopupComponent, {
      data: dialogData
    });
  }

  selectionChanged(event: SelectionChangedEvent) {
    if (1 < event.api.getSelectedRows().length) {
      this.showGlobalOperation = true;
    } else {
      this.showGlobalOperation = false;
    }
    this.datashare.chechboxChangeMessage(this.showGlobalOperation);
  }

  openUpdateDialog(): void {
    const message = `Are you sure you want to update the KPI Settings?`;
    const image = 'warning';
    const snackbarMessage = 'asdadasd';
    const dialogData = new CommonDialogModel("Warning!", message, image, snackbarMessage);
    const dialogRef = this.dialog.open(CommonPopupComponent, {
      data: dialogData
    });
  }
}
