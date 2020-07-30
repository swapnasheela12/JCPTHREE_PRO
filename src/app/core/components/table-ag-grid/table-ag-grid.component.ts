import { DataSharingService } from './../../../_services/data-sharing.service';
import { DataSharHttpService } from './../../../modules/components/data-shar-http.service';
import { HttpClient } from '@angular/common/http';
import { ButtonRendererComponent } from './../../../main-modules/reports-dashboards/my-reports/button-renderer.component';
import { TableAgGridService } from './table-ag-grid.service';
import { Component, OnInit } from '@angular/core';

import { GridOptions, GridCore, GridApi, ColumnApi,SelectionChangedEvent } from "@ag-grid-community/all-modules";

@Component({
  selector: 'app-table-ag-grid',
  templateUrl: './table-ag-grid.component.html',
  styleUrls: ['./table-ag-grid.component.scss']
})
export class TableAgGridComponent implements OnInit {

  public gridApi;
  public gridOptions: GridOptions;
  columnDefs;
  rowData;
  gridOptionsObj;
  defaultColDef;
  typeOfAgGridTable;
  public frameworkComponentsMyReport = {
    buttonRenderer: ButtonRendererComponent,
  };

  sidenavBarStatus;
  showGlobalOperation;

  constructor(public data: TableAgGridService,private datashare: DataSharingService,private httpClient: HttpClient,) {
    console.log(data, "data");

    this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
      if(this.sidenavBarStatus == false){
        setTimeout(() => {
          this.gridOptions.api.sizeColumnsToFit();
        }, 1000);
      }else{
        setTimeout(() => {
          this.gridOptions.api.sizeColumnsToFit();
        }, 1000);
      }
      
    });
    
    this.gridOptions = <GridOptions>{};

    this.columnDefs = data.columnDefsServices;
    this.rowData = data.rowDataServices;
    this.gridOptionsObj = this.data.gridOptionsServices;
    this.defaultColDef = this.data.defaultColDefServices;
    this.typeOfAgGridTable = this.data.typeOfAgGridTable;
  }

  ngOnInit(): void {
  }

  onReadyModeUpdate(params) {
    this.calculateRowCount();
  }

  public calculateRowCount() {
   if (this.gridOptions.api && this.rowData) {
      setTimeout(() => {
        this.gridOptions.api.sizeColumnsToFit();
      }, 1000);
    }
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.calculateRowCount();
  }

  selectionChanged(event: SelectionChangedEvent) {
    let lengthOfSelectedRow = event.api.getSelectedRows().length;
    if (1 < lengthOfSelectedRow) {
      this.showGlobalOperation = true;
    } else {
      this.showGlobalOperation = false;
    }
  }


}
