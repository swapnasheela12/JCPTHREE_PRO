import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

const HEADER_PERFORMANCE_REPORTS = [
  {
    headerName: "Name",
    field: "status",
    width: 180,
    // cellRenderer: 'statusFlagRenderer',
    pinned: 'left',
    checkboxSelection: function(params) {
      return params.columnApi.getRowGroupColumns().length === 0;
    },
    headerCheckboxSelection: function(params) {
      return params.columnApi.getRowGroupColumns().length === 0;
    },
    cellClass: 'lock-pinned',
  },
  {
    headerName: "Type",
    field: 'createdDate',
    width: 160
  },
  {
    headerName: "Generation",
    field: 'createdDate',
    width: 160,
  },
  {
    headerName: "Domain",
    field: "domain",
    width: 120
  },
  {
    headerName: "Vendor",
    field: "vendor",
    width: 120
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
    headerName: "Progress",
    field: 'createdDate',
    width: 160
  },
  {
    headerName: "Status",
    field: "vendor",
    width: 120
  },
  {
    headerName: "File Size",
    field: "vendor",
    width: 120
  },
  {
    headerName: "",
    cellRenderer:'VerticaldotRenderer',
    width: 70,
    pinned: 'right'

  }
];

@Component({
  selector: 'app-my-performance-reports',
  templateUrl: './my-performance-reports.component.html',
  styleUrls: ['./my-performance-reports.component.scss']
})

export class MyPerformanceReportsComponent implements OnInit {
  public gridMyPerformanceColumnDefs: any[];
  public gridMyPerformanceRowData: any;
  public gridMyPerformanceGridOptions: GridOptions;
  public frameworkComponentsMyPerformanceReports;

  constructor(private http: HttpClient) { }
  // my-performance-report.json

  ngOnInit(): void {
    this.createColumnDefs();
    this.getMyPerformanceReportsData();
  }

  private createColumnDefs() {
    this.gridMyPerformanceColumnDefs = HEADER_PERFORMANCE_REPORTS;
  }

  private getMyPerformanceReportsData() {
    this.http.get("assets/data/modules/performance_management/my-performance-report/my-performance-report.json")
      .subscribe(data => {
        this.gridMyPerformanceRowData = data;
    });
  }

}
