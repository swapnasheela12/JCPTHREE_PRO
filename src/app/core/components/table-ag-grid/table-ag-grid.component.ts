import { HttpClient } from '@angular/common/http';
import { ButtonRendererComponent } from './../../../main-modules/reports-dashboards/my-reports/button-renderer.component';
import { TableAgGridService } from './table-ag-grid.service';
import { Component, OnInit } from '@angular/core';

import { GridOptions, GridCore, GridApi, ColumnApi, } from "@ag-grid-community/all-modules";

@Component({
  selector: 'app-table-ag-grid',
  templateUrl: './table-ag-grid.component.html',
  styleUrls: ['./table-ag-grid.component.scss']
})
export class TableAgGridComponent implements OnInit {

  // columnDefs = [
  //   { headerName: 'Make', field: 'make' },
  //   { headerName: 'Model', field: 'model' },
  //   { headerName: 'Price', field: 'price' }
  // ];


  // rowData = [
  //   { make: 'Toyota', model: 'Celica', price: 35000 },
  //   { make: 'Ford', model: 'Mondeo', price: 32000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 }
  // ];

  public gridApi;
  public gridOptions: GridOptions;
  columnDefs;
  rowData;
  gridOptionsObj;
  defaultColDef;
  public frameworkComponentsMyReport = {
    buttonRenderer: ButtonRendererComponent,
  };

  constructor(public data: TableAgGridService,private httpClient: HttpClient,) {
    console.log(data, "data");
    this.gridOptions = <GridOptions>{};

    this.columnDefs = data.columnDefsServices;
   
   
      this.rowData = data.rowDataServices;
   
   
    // this.gridOptionsObj = this.data.gridOptionsServices;
    this.defaultColDef = this.data.defaultColDefServices;
  }

  // private httpClientRowData() {
  //   this.httpClient
  //     .get("assets/data/report/my-report.json")
  //     .subscribe(data => {
  //       this.rowData = data;
       
  //     });
  // }

  ngOnInit(): void {
  }

  onReadyModeUpdate(params) {
    this.calculateRowCount();
  }

  public calculateRowCount() {
    console.log(this.gridOptionsObj, "this.gridOptionsObj");
    console.log(this.gridOptions, "this.gridOptions");

    if (this.gridOptions.api && this.rowData) {
      setTimeout(() => {
        this.gridOptions.api.sizeColumnsToFit();
      }, 1000);
    }
  }

  public onReady(params) {
    console.log(params, "onReady");
    this.gridApi = params.api;
    this.calculateRowCount();
  }


}
