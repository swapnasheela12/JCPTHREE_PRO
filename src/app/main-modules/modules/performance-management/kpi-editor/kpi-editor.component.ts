import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridOptions, GridCore, SelectionChangedEvent, GridApi } from 'ag-grid-community';
import { StatusRendererComponent } from './renderer/status-renderer.component';
import { VerticaldotRendererComponent } from './renderer/verticaldot-renderer.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commanPopup/common-popup/common-popup.component';
import * as moment from 'moment';
import { DataSharingService } from 'src/app/_services/data-sharing.service';

const PATHS = [
  {createKPI: "JCP/Modules/Performance-Management/KPI-Editor/Create-KPI"}
]

@Component({
  selector: 'app-kpi-editor',
  templateUrl: './kpi-editor.component.html',
  styleUrls: ['./kpi-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KpiEditorComponent implements OnInit {
  public columnDefs: any[];
  public rowData: object;
  private gridApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public frameworkComponentsKPIEditor;
  gridColumnApi: any;
  public rowSelection;
  show: boolean;
  searchGrid = '';
  public showGlobalOperation:Boolean = false;
  private paginationPageSize = 10;
  public paths;
  HEADER_KPI = [
    {
      headerName: "Status",
      field: "status",
      width: 180,
      cellRenderer: 'statusFlagRenderer',
      pinned: 'left',
      checkboxSelection: function(params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
      headerCheckboxSelection: function(params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
      cellClass: 'lock-pinned',
    }, {
      headerName: "Name",
      field: "Name",
      width: 210,
      pinned: 'left',
      cellClass: 'lock-pinned',
    }, {
      headerName: "Node",
      field: "node",
      width: 110
    }, {
      headerName: "Domain",
      field: "domain",
      width: 120
    }, {
      headerName: "Vendor",
      field: "vendor",
      width: 120
    }, {
      headerName: "EMS",
      field: 'ems',
      width: 110
    },
    {
      headerName: "Created By",
      colId: 'CfirstName&ClastName',
      valueGetter: function(params) {
        return params.data.createrFirstName
          +' '+params.data.createrLastName;
      },
      width: 160
    },
    {
      headerName: "Created Date",
      field: 'createdDate',
      width: 160,
      valueFormatter: function(params){
        return moment(params.value).format('LL')
      }
    }, 
    {
      headerName: "Modified By",
      colId: 'MfirstName&MlastName',
      valueGetter: function(params) {
        return params.data.modifierFirstName+
        ' '+params.data.modifierLastName;
      },
      width: 160
    }, 
    { 
      headerName: "Modified Date",
      field: 'modifierTime',
      width: 160,
      valueFormatter: function(params){
        return moment(params.value).format('LL')
      }
    }, {
      headerName: "15 Mins. Value",
      field: '15MinValue',
      width: 160
    }, {
      headerName: "",
      cellRenderer:'VerticaldotRenderer',
      width: 70,
      id: "dot-rendered-kpi-local",
      pinned: 'right'

    }
  ];

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public datashare: DataSharingService
  ) {
    this.gridOptions = <GridOptions>{};
    this.frameworkComponentsKPIEditor = {
      'statusFlagRenderer': StatusRendererComponent,
      'VerticaldotRenderer': VerticaldotRendererComponent
    };
    this.datashare.chechboxChangeMessage(this.showGlobalOperation);
    this.paginationPageSize = 10;
    this.paths = PATHS;
  }

  ngOnInit(): void {
    this.createColumnDefs();
    this.getKPIData();
  }

  get PaginationPageSize(): number {
    return this.paginationPageSize;
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

  private getKPIData() {
    this.http.get("assets/data/modules/performance_management/kpi-editor/kpi-editor-list.json")
      .subscribe(data => {
        this.rowData = data;
    });
  }

  openBulkDeleteDialog():void {
    const message = `Are you Sure you want to perform this action?`;
    const image = 'warning';
    const snackbarMode = 'success';
    const snackbarText = 'Action Performed Successfully';
    const dialogData = new CommonDialogModel("Warning!", message, image, snackbarMode, snackbarText);
    const dialogRef = this.dialog.open(CommonPopupComponent, {
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
}