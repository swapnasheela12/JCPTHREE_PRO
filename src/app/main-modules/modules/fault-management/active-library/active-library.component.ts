import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridOptions, GridCore, SelectionChangedEvent, GridApi } from 'ag-grid-community';
// import { StatusRendererComponent } from './renderer/status-renderer.component';
// import { VerticaldotRendererComponent } from './renderer/verticaldot-renderer.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';
import * as moment from 'moment';
import { DataSharingService } from 'src/app/_services/data-sharing.service';


@Component({
  selector: 'app-active-library',
  templateUrl: './active-library.component.html',
  styleUrls: ['./active-library.component.scss']
})
export class ActiveLibraryComponent implements OnInit {


  public columnDefs: any;
  public rowData: any;
  
  private gridApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public frameworkComponentsActiveLibrary;
  gridColumnApi: any;
  
  public rowSelection;
  show: boolean;
  searchGrid = '';
  public showGlobalOperation:Boolean = false;
  private paginationPageSize = 10;
  public paths;


  

constructor(
  private http: HttpClient,
  public dialog: MatDialog,
  public datashare: DataSharingService
) {
  this.gridOptions = <GridOptions>{};
  this.frameworkComponentsActiveLibrary = {
    // 'statusFlagRenderer': StatusRendererComponent,
    // 'VerticaldotRenderer': VerticaldotRendererComponent
  };
  this.datashare.chechboxChangeMessage(this.showGlobalOperation);
  this.paginationPageSize = 10;
//  this.paths = PATHS;
}

ngOnInit(): void {
  this.createColumnDefs();
  this.getActiveLibraryData();
}




  header_Active_Library = [
    {
      headerName: " Alarm ID",
      field: "alarmid",
      width: 180,
      pinned: 'left',
      checkboxSelection: function (params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
      headerCheckboxSelection: function (params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
      
     
    }, {
      headerName: "Alarm Name",
      field: "alarmname",
      width: 210,
      pinned: 'left',
      cellClass: 'lock-pinned',
    }, {
      headerName: "Domain",
      field: "domain",
      width: 110
    }, {
      headerName: "Device Type",
      field: "devicetype",
      width: 120
    }, {
      headerName: "Vendor",
      field: "vendor",
      width: 120
    }, {
      headerName: "Unit Type",
      field: 'unittype',
      width: 110
    },
    {
      headerName: "Severity",
     field: 'severity',
     width: 160
    },
    {
      headerName: "EMS Source",
      field: 'emssource',
      width: 160,
      
    }, 
    {
      headerName: "EMS Release",
      field: 'emsrelease',
     
      width: 160
    }, 
    { 
      headerName: "",
      field: '',
      width: 160
     
    }
  ];

  

  get PaginationPageSize(): number {
    return this.paginationPageSize;
  }

  get gridAPI(): GridApi {
    return this.gridApi;
  }

  private createColumnDefs() {
    this.columnDefs = this.header_Active_Library;
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

  private getActiveLibraryData() {
    this.http.get("assets/data/modules/fault-management/active-library-data.json")
      .subscribe(data => {
        this.rowData = data;
    });
  }

}
