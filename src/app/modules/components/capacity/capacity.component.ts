import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions, GridCore, SelectionChangedEvent, GridApi } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { TableAgGridService } from '../../../core/components/table-ag-grid/table-ag-grid.service';
import { GenhelpiconComponent } from '../../../core/components/ag-grid-renders/genhelpicon.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.scss']
})
export class CapacityComponent {
  public caprowData;
  public sidenavBarStatus;
  public tableWidth;
  public gridApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public gridPinned;
  defaultColDef;
  gridColumnApi;
  public rowData: any;
  public columnDefs: any[];
  public rowCount: string;
  public capacityColumndata;
  public capacityRowdata;
  public capacityColumns
  public capacityRows;
  public frameworkComponentsCapacitymenu;
  public frameworkComponentsHelpIcon;
  public showGlobalOperation: Boolean = false;
  public kpivalue;
  rowClassRules: {};
  public cellClassRules;
  url_1 = "assets//layers/popup-data/capacity-popup-data.json";

  onReadyModeUpdate(params) {
    this.calculateRowCount();
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.calculateRowCount();
  }
  public calculateRowCount() {
    if (this.gridOptions.api && this.rowData) {
      setTimeout(() => {
        this.gridOptions.api.sizeColumnsToFit();
      }, 1000);
    }
  }

  constructor(
    public datatable: TableAgGridService,
    public dialog: MatDialog,
    public matDialog: MatDialog,
    public matselect: MatSelectModule,
    public datashare: DataSharingService,
    private http: HttpClient,
    public dialogRef: MatDialogRef<CapacityComponent>,
    private router: Router) {

    this.frameworkComponentsHelpIcon = {
      helpicon: GenhelpiconComponent
    };

    router.events.subscribe((url: any) => { });
    this.gridOptions = <GridOptions>{};
    this.createColumnDefs();

    this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });

    this.http.get("assets/data/layers/popup-data/capacity-popup-data.json")
      .subscribe(data => {
        this.rowData = data;
        this.datatable.rowDataURLServices = "assets/data/layers/popup-data/capacity-popup-data.json";
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid-without-Pagination";
        this.datatable.rowDataServices = this.rowData;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });
  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "KPIs",
        field: "kpis",
        width: 200,
        pinned: "left"
      }, {
        headerName: "2300 MHz-C1",
        field: 'mhzc12300',
        width: 160
      }, {
        headerName: "2300 MHz-C2",
        field: 'mhzc22300',
        width: 160
      },
      {
        headerName: "1800 MHz",
        field: 'mhz1800',
        width: 140
      }, {
        headerName: "850 MHz-C1",
        field: 'mhzc1850',
        width: 160
      },
      {
        headerName: "850 MHz-C2",
        field: 'mhzc2850',
        width: 160
      },
      {
        headerName: "",
        field: "",
        width: 60,
        pinned: 'right',
        cellRenderer: 'helpicon',
      }
    ];
    this.datatable.columnDefsServices = this.columnDefs;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }


  close() {
    this.dialogRef.close();
  }
}
