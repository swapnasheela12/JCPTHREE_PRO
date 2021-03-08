import { layersIconRenderComponent } from '../../../../../../core/components/ag-grid-renders/layersicon.component';
import { dropDownList3DotRendererComponent } from '../../../../../../core/components/ag-grid-renders/dropDownList3DotRenderer.component';
import { Subscription } from 'rxjs';
import * as Highcharts from 'highcharts';
import * as _ from 'lodash';
import { GridOptions, GridCore, GridApi } from 'ag-grid-community';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { HttpClient } from '@angular/common/http';
import { fileUploadPopupModel, FileUploadPopupComponent } from 'src/app/core/components/commonPopup/file-upload-popup/file-upload-popup.component';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { Router } from '@angular/router';
import rounded from 'highcharts-rounded-corners';
// import { CustomTooltip } from '../custom-tooltip.component';
// import { AlarmSummaryChartExpandComponent } from './alarm-summary-chart-expand/alarm-summary-chart-expand.component';
import { MatDialog } from '@angular/material/dialog';

import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Chart } from "angular-highcharts";
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-alarm-summary-table',
  templateUrl: './alarm-summary-table.component.html',
  styleUrls: ['./alarm-summary-table.component.scss']
})
export class AlarmSummaryTableComponent implements OnInit {
  public suppressHorizontalScroll = false;
  public parentDataGet;
  @Input('data')
  set data(data: any) {
    console.log(data, "child");
    this.parentDataGet = data;
    //do whatever you want with your data here, this data will be passed from parent component
  }

  public parentDataGetTable;
  @Input('dataTable')
  set dataTable(dataTable: any) {
    console.log(dataTable, "child>>>>>");
    setTimeout(() => {
      this.parentDataGetTable = dataTable;
    }, 600);

    //do whatever you want with your data here, this data will be passed from parent component
  }
  // public parentDataGetTable2;
  // @Input('dataTable2')
  // set dataTable2(dataTable: any) {
  //   console.log(dataTable, "child>>>>>");
  //   this.parentDataGetTable2 = dataTable;
  //   //do whatever you want with your data here, this data will be passed from parent component
  // }
  constructor(public datashare: DataSharingService,
    public http: HttpClient,
    public dialog: MatDialog,
    private fileUploadService: FileUploadService,
    private datatable: TableAgGridService,
    private router: Router, public matDialog: MatDialog) {

    // this.gridOptions = <GridOptions>{
    //   suppressHorizontalScroll: false,
    // };
    // this.httpClientRowData();
    // this.createColumnDefs();
    

    this.gridOptionsTable1 = <GridOptions>{
      suppressHorizontalScroll: false,
    };
    this.httpClientRowDataTable1();
    this.createColumnDefsTable1();


    this.gridOptionsPloy = <GridOptions>{
      suppressHorizontalScroll: false,
    };
    this.httpClientRowDataPloy();
    this.createColumnDefsPloy();


    this.gridOptionsTable3 = <GridOptions>{
      suppressHorizontalScroll: false,
    };
    this.httpClientRowDataTable3();
    this.createColumnDefsTable3();


    this.gridOptionsTable4 = <GridOptions>{
      suppressHorizontalScroll: false,
    };
    this.httpClientRowDataTable4();
    this.createColumnDefsTable4();



    this.gridOptionsTable5 = <GridOptions>{
      suppressHorizontalScroll: false,
    };
    this.httpClientRowDataTable5();
    this.createColumnDefsTable5();











  }

  ngOnInit(): void {

  }

  tiles: Tile[] = [
    { text: 'One', cols: 2, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 4, rows: 1, color: 'lightgreen' },
    { text: 'Three', cols: 3, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 3, rows: 1, color: '#DDBDF1' },
    { text: 'Five', cols: 3, rows: 1, color: '#DDBDF1' },
  ];
  public eachGraphSelected = "";
  expandViewWidget(graphType) {
    console.log(graphType, "graphType");

    // graphType.forEach(res => {
    //   // this.eachGraphSelected += res.name + ", ";
    //   this.eachGraphSelected = res.name;
    //   console.log(this.eachGraphSelected,"this.eachGraphSelected");
    //   return this.eachGraphSelected;
    // })
    this.openFlagConf(graphType)
  }

  openFlagConf(selectedGraph) {
    // const dialogRef = this.matDialog.open(AlarmSummaryChartExpandComponent, {
    //   width: "700px",
    //   height: '500px',
    //   data: selectedGraph,
    //   panelClass: "material-dialog-container"
    // });
  }


  // public gridApi;
  // public gridPinned = false;
  // public gridCore: GridCore;
  // public gridOptions: GridOptions;
  // public rowData: any;
  // public columnDefs: any[];
  // public rowCount: string;
  // public defaultColDef = { resizable: true };
  // public frameworkComponentsMyReport = {
  //   dropDownThreeDotRenderer: dropDownList3DotRendererComponent,
  // };


  // public onReady(params) {
  //   console.log(params, "onReady");
  //   this.gridApi = params.api;
  //   // params.api.sizeColumnsToFit();
  // }

  // public httpClientRowData() {
  //   this.http
  //     .get("assets/data/modules/fault-management/active-alarm/table1.json")
  //     .subscribe(data => {
  //       this.rowData = data;
  //       this.datatable.typeOfAgGridTable = "Default-Ag-Grid-without-Pagination";
  //       this.datatable.rowDataServices = this.rowData;
  //       this.datatable.gridPinnedServices = this.gridPinned;
  //       this.datatable.gridOptionsServices = this.gridOptions;
  //       this.datatable.gridOptionSuppressHorizontalScroll = this.suppressHorizontalScroll;
  //       this.datatable.defaultColDefServices = this.defaultColDef;
  //     });
  // }

  // public createColumnDefs() {
  //   this.columnDefs = [
  //     {
  //       headerName: "Sr No",
  //       field: "SrNo",
  //       width: 150,
  //       pinned: 'left',
  //     },
  //     {
  //       headerName: "Circle",
  //       field: "Circle",
  //       width: 145,
  //     },
  //     {
  //       headerName: "SA",
  //       field: "SA",
  //       width: 115,
  //     },
  //     {
  //       headerName: "NSA ",
  //       field: "NSA",
  //       width: 130,
  //     },
  //     {
  //       headerName: "Performance Degrading",
  //       field: "PerformanceDegrading",
  //       width: 130,
  //     }
  //     // ,
  //     // {
  //     //   headerName: "",
  //     //   cellRenderer: 'dropDownThreeDotRenderer',
  //     //   width: 110,
  //     //   pinned: 'right',
  //     // }
  //   ];

  //   this.datatable.columnDefsServices = this.columnDefs;
  // }

  // onFilterChanged(value) {
  //   console.log(value, "value");
  //   console.log(this.gridOptions.api.setQuickFilter(value), "valthis.gridOptions.api.setQuickFilter(value)ue");
  //   this.datatable.gridFilterValueServices = value;
  // };

  show: any;
  toggleSearch() {
    this.show = !this.show;
  };




  public gridApiTable1;
  public gridPinnedTable1 = false;
  public gridOptionsTable1: GridOptions;
  public rowDataTable1: any;
  public columnDefsTable1: any[];
  public defaultColDefTable1 = { resizable: true };
  public frameworkComponentsTable1 = {
    dropDownThreeDotRenderer: dropDownList3DotRendererComponent,
    layersIconRender: layersIconRenderComponent,
  };

  public onReadyTable1(params) {
    console.log(params, "onReady");
    this.gridApiTable1 = params.api;
    // params.api.sizeColumnsToFit();
  }

 
  public httpClientRowDataTable1() {
    this.http
      .get("assets/data/modules/fault-management/active-alarm/table1.json")
      .subscribe(data => {
        this.rowDataTable1 = data;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid-without-Pagination";
        this.datatable.rowDataServices = this.rowDataTable1;
        this.datatable.gridPinnedServices = this.gridPinnedTable1;
        this.datatable.gridOptionsServices = this.gridOptionsTable1;
        this.datatable.gridOptionSuppressHorizontalScroll = this.suppressHorizontalScroll;
        this.datatable.defaultColDefServices = this.defaultColDefTable1;
      });
  }

  public createColumnDefsTable1() {
    this.columnDefsTable1 = [
      {
        headerName: "Sr No",
        field: "SrNo",
        width: 120,
        pinned: 'left',
      },
      {
        headerName: "Circle",
        field: "Circle",
        width: 145,
      },
      {
        headerName: "SA",
        field: "SA",
        width: 115,
      },
      {
        headerName: "NSA ",
        field: "NSA",
        width: 130,
      },
      {
        headerName: "Performance Degrading",
        field: "PerformanceDegrading",
        width: 240,
      }
    ];

    this.datatable.columnDefsServices = this.columnDefsTable1;
  }

  onFilterChangedTable1(value) {
    console.log(value, "value");
    console.log(this.gridOptionsTable1.api.setQuickFilter(value), "valthis.gridOptions.api.setQuickFilter(value)ue");
    this.datatable.gridFilterValueServices = value;
  };




  public gridApiPloy;
  public gridPinnedPloy = false;
  public gridOptionsPloy: GridOptions;
  public rowDataPloy: any;
  public columnDefsPloy: any[];
  public defaultColDefPloy = { resizable: true };
  public frameworkComponentsPloy = {
    dropDownThreeDotRenderer: dropDownList3DotRendererComponent,
    layersIconRender: layersIconRenderComponent,
  };

  public onReadyPloy(params) {
    console.log(params, "onReady");
    this.gridApiPloy = params.api;
    // params.api.sizeColumnsToFit();
  }

  public httpClientRowDataPloy() {
    this.http
      .get("assets/data/modules/fault-management/active-alarm/table2.json")
      .subscribe(data => {
        this.rowDataPloy = data;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid-without-Pagination";
        this.datatable.rowDataServices = this.rowDataPloy;
        this.datatable.gridPinnedServices = this.gridPinnedPloy;
        this.datatable.gridOptionsServices = this.gridOptionsPloy;
        this.datatable.gridOptionSuppressHorizontalScroll = this.suppressHorizontalScroll;
        this.datatable.defaultColDefServices = this.defaultColDefPloy;
      });
  }

  public createColumnDefsPloy() {
    this.columnDefsPloy = [
      {
        headerName: "Created Date",
        field: "CreatedDate",
        width: 180,
        pinned: 'left',
      },
      {
        headerName: "Circle",
        field: "Circle",
        width: 140,
      },
      {
        headerName: "JC ID",
        field: "JCID",
        width: 120,
      },
      {
        headerName: "Hour",
        field: "HOUR",
        width: 120,
      },
      {
        headerName: "Outage Alarm Minutes",
        field: "OutageAlarmMinutes",
        width: 250,
      },
     
    ];

    this.datatable.columnDefsServices = this.columnDefsPloy;
  }

  onFilterChangedPloy(value) {
    console.log(value, "value");
    console.log(this.gridOptionsPloy.api.setQuickFilter(value), "valthis.gridOptions.api.setQuickFilter(value)ue");
    this.datatable.gridFilterValueServices = value;
  };




  public gridApiTable3;
  public gridPinnedTable3 = false;
  public gridOptionsTable3: GridOptions;
  public rowDataTable3: any;
  public columnDefsTable3: any[];
  public defaultColDefTable3 = { resizable: true };
  public frameworkComponentsTable3 = {
    dropDownThreeDotRenderer: dropDownList3DotRendererComponent,
    layersIconRender: layersIconRenderComponent,
  };

  public onReadyTable3(params) {
    console.log(params, "onReady");
    this.gridApiTable3 = params.api;
    // params.api.sizeColumnsToFit();
  }

 
  public httpClientRowDataTable3() {
    this.http
      .get("assets/data/modules/fault-management/active-alarm/table3.json")
      .subscribe(data => {
        this.rowDataTable3 = data;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid-without-Pagination";
        this.datatable.rowDataServices = this.rowDataTable3;
        this.datatable.gridPinnedServices = this.gridPinnedTable3;
        this.datatable.gridOptionsServices = this.gridOptionsTable3;
        this.datatable.gridOptionSuppressHorizontalScroll = this.suppressHorizontalScroll;
        this.datatable.defaultColDefServices = this.defaultColDefTable3;
      });
  }

  public createColumnDefsTable3() {
    this.columnDefsTable3 = [
      {
        headerName: "Created Date",
        field: "CreatedDate",
        width: 180,
        pinned: 'left',
      },
      {
        headerName: "Circle",
        field: "Circle",
        width: 140,
      },
      {
        headerName: "JC ID",
        field: "JCID",
        width: 140,
      },
      {
        headerName: "Type",
        field: "Type",
        width: 150,
      },
      {
        headerName: "0-4 Hrs",
        field: "Hrs0-4",
        width: 150,
      },
      {
        headerName: "4-8 Hrs",
        field: "Hrs4-8",
        width: 150,
      },
      {
        headerName: "8-12 Hrs",
        field: "Hrs8-12",
        width: 150,
      },
      {
        headerName: "12-24 Hrs",
        field: "Hrs12-24",
        width: 150,
      },
      {
        headerName: ">24 Hrs",
        field: "Hrs>24",
        width: 150,
      },
      // {
      //   headerName: "",
      //   field: "creationdate",
      //   cellRenderer: 'layersIconRender',
      //   headerComponentParams: { template: '<div style="width: 100%;font-size:20px;display:flex;justify-content:center;align-items:center;color:#707070;" class="zmdi zmdi-edit"></div>' },
      //   cellStyle: {
      //     'display': 'flex ',
      //     'justify-content': 'center',
      //     'align-items': 'center ',
      //   },
      //   width: 150,
      // },
      // {
      //   headerName: "",
      //   cellRenderer: 'dropDownThreeDotRenderer',
      //   width: 110,
      //   pinned: 'right',
      // }
    ];

    this.datatable.columnDefsServices = this.columnDefsTable3;
  }

  onFilterChangedTable3(value) {
    console.log(value, "value");
    console.log(this.gridOptionsTable3.api.setQuickFilter(value), "valthis.gridOptions.api.setQuickFilter(value)ue");
    this.datatable.gridFilterValueServices = value;
  };



  public gridApiTable4;
  public gridPinnedTable4 = false;
  public gridOptionsTable4: GridOptions;
  public rowDataTable4: any;
  public columnDefsTable4: any[];
  public defaultColDefTable4 = { resizable: true };
  public frameworkComponentsTable4 = {
    dropDownThreeDotRenderer: dropDownList3DotRendererComponent,
    layersIconRender: layersIconRenderComponent,
  };

  public onReadyTable4(params) {
    console.log(params, "onReady");
    this.gridApiTable4 = params.api;
    // params.api.sizeColumnsToFit();
  }

  public httpClientRowDataTable4() {
    this.http
      .get("assets/data/modules/fault-management/active-alarm/table4.json")
      .subscribe(data => {
        this.rowDataTable4 = data;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid-without-Pagination";
        this.datatable.rowDataServices = this.rowDataTable4;
        this.datatable.gridPinnedServices = this.gridPinnedTable4;
        this.datatable.gridOptionsServices = this.gridOptionsTable4;
        this.datatable.gridOptionSuppressHorizontalScroll = this.suppressHorizontalScroll;
        this.datatable.defaultColDefServices = this.defaultColDefTable4;
      });
  }

  public createColumnDefsTable4() {
    this.columnDefsTable4 = [
      {
        headerName: "Sr No",
        field: "SrNo",
        width: 120,
        pinned: 'left',
      },
      {
        headerName: "Circle",
        field: "Circle",
        width: 145,
      },
      {
        headerName: "SA",
        field: "SA",
        width: 115,
      },
      {
        headerName: "NSA ",
        field: "NSA",
        width: 130,
      },
      {
        headerName: "Performance Degrading",
        field: "PerformanceDegrading",
        width: 240,
      }
    ];

    this.datatable.columnDefsServices = this.columnDefsTable4;
  }

  onFilterChangedTable4(value) {
    console.log(value, "value");
    console.log(this.gridOptionsTable4.api.setQuickFilter(value), "valthis.gridOptions.api.setQuickFilter(value)ue");
    this.datatable.gridFilterValueServices = value;
  };






  public gridApiTable5;
  public gridPinnedTable5 = false;
  public gridOptionsTable5: GridOptions;
  public rowDataTable5: any;
  public columnDefsTable5: any[];
  public defaultColDefTable5 = { resizable: true };
  public frameworkComponentsTable5 = {
    dropDownThreeDotRenderer: dropDownList3DotRendererComponent,
    layersIconRender: layersIconRenderComponent,
  };

  public onReadyTable5(params) {
    console.log(params, "onReady");
    this.gridApiTable5 = params.api;
    // params.api.sizeColumnsToFit();
  }

  public httpClientRowDataTable5() {
    this.http
      .get("assets/data/modules/fault-management/active-alarm/table5.json")
      .subscribe(data => {
        this.rowDataTable5 = data;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid-without-Pagination";
        this.datatable.rowDataServices = this.rowDataTable5;
        this.datatable.gridPinnedServices = this.gridPinnedTable5;
        this.datatable.gridOptionsServices = this.gridOptionsTable5;
        this.datatable.defaultColDefServices = this.defaultColDefTable5;
      });
  }

  public createColumnDefsTable5() {
    this.columnDefsTable5 = [
      
      {
        headerName: "Circle",
        field: "Circle",
        width: 140,
        pinned: 'left'
      },
      {
        headerName: "JC ID",
        field: "JCID",
        width: 120,
      },
      {
        headerName: "Sap ID",
        field: "SapID",
        width: 120,
      },
      {
        headerName: "Outage Start",
        field: "OutageStart",
        width: 180,
      },
      {
        headerName: "Outage Duration (Hrs)",
        field: "OutageDuration",
        width: 250,
      }
    ];

    this.datatable.columnDefsServices = this.columnDefsTable5;
  }

  onFilterChangedTable5(value) {
    console.log(value, "value");
    console.log(this.gridOptionsTable5.api.setQuickFilter(value), "valthis.gridOptions.api.setQuickFilter(value)ue");
    this.datatable.gridFilterValueServices = value;
  };
















}
