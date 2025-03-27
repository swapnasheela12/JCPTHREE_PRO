import { FmDataSharingService } from './../../../../../../../_services/fm-data-sharing.service';
import { layersIconRenderComponent } from './../../../../../../../core/components/ag-grid-renders/layersicon.component';
import { dropDownList3DotRendererComponent } from './../../../../../../../core/components/ag-grid-renders/dropDownList3DotRenderer.component';
// import { FmDataSharingService } from './../../../../../../_services/fm-data-sharing.service';
// import { layersIconRenderComponent } from '../../../../../../core/components/ag-grid-renders/layersicon.component';
// import { dropDownList3DotRendererComponent } from '../../../../../../core/components/ag-grid-renders/dropDownList3DotRenderer.component';
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

import { Input, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Chart } from "angular-highcharts";
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-history-alarm-table',
  templateUrl: './history-alarm-table.component.html',
  styleUrls: ['./history-alarm-table.component.scss']
})
export class HistoryAlarmTableComponent implements OnInit {

  public suppressHorizontalScroll = false;

  public parentDataGetTable;
  @Input('dataTable')
  set dataTable(dataTable: any) {
    this.parentDataGetTable = dataTable;
  }

  constructor(public datashare: DataSharingService,
    public http: HttpClient,
    public dialog: MatDialog,
    public dataShareFM: FmDataSharingService,
    private fileUploadService: FileUploadService,
    private datatable: TableAgGridService,
    private router: Router, public matDialog: MatDialog) {

    this.dataShareFM.currentMessageTitle.subscribe((val: any) => {

      if (val.tableName == 'Historical Alarm Statistics' && val.statusSingleView == true && val.chartOrTable == true) {
        this.parentDataGetTable = val.tableName;
        setTimeout(() => {
          $('#alarmTable2').addClass("activeHide");
          $('#alarmTable3').addClass("activeHide");
          $('#alarmTable4').addClass("activeHide");
          $('#alarmTable5').addClass("activeHide");
          $('#alarmTable6').addClass("activeHide");
        }, 1000);
      } else if (val.tableName == 'Top Recurring Alarms' && val.statusSingleView == true) {
        this.parentDataGetTable = val.tableName;
        setTimeout(() => {
          $('#alarmTable1').addClass("activeHide");
          $('#alarmTable3').addClass("activeHide");
          $('#alarmTable4').addClass("activeHide");
          $('#alarmTable5').addClass("activeHide");
          $('#alarmTable6').addClass("activeHide");
        }, 500);
      }
      else if (val.tableName == 'Network Availability Trend' && val.statusSingleView == true) {
        this.parentDataGetTable = val.tableName;
        setTimeout(() => {
          $('#alarmTable1').addClass("activeHide");
          $('#alarmTable2').addClass("activeHide");
          $('#alarmTable4').addClass("activeHide");
          $('#alarmTable5').addClass("activeHide");
          $('#alarmTable6').addClass("activeHide");
        }, 500);
      }
      else if (val.tableName == 'Top Contributing Alarms based on Outage Mins.' && val.statusSingleView == true) {
        this.parentDataGetTable = val.tableName;
        setTimeout(() => {
          $('#alarmTable1').addClass("activeHide");
          $('#alarmTable2').addClass("activeHide");
          $('#alarmTable3').addClass("activeHide");
          $('#alarmTable5').addClass("activeHide");
          $('#alarmTable6').addClass("activeHide");
        }, 500);
      }
      else if (val.tableName == 'Clearance Ratio' && val.statusSingleView == true) {
        this.parentDataGetTable = val.tableName;
        setTimeout(() => {
          $('#alarmTable1').addClass("activeHide");
          $('#alarmTable2').addClass("activeHide");
          $('#alarmTable3').addClass("activeHide");
          $('#alarmTable4').addClass("activeHide");
          $('#alarmTable6').addClass("activeHide");
        }, 500);
      }
      else if (val.tableName == 'Alarms per Cell' && val.statusSingleView == true) {
        this.parentDataGetTable = val.tableName;
        setTimeout(() => {
          $('#alarmTable1').addClass("activeHide");
          $('#alarmTable2').addClass("activeHide");
          $('#alarmTable3').addClass("activeHide");
          $('#alarmTable4').addClass("activeHide");
          $('#alarmTable5').addClass("activeHide");
        }, 500);
      }

    });

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


    this.gridOptionsTable6 = <GridOptions>{
      suppressHorizontalScroll: false,
    };
    this.httpClientRowDataTable6();
    this.createColumnDefsTable6();
  }

  ngOnInit(): void { }


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
      .get("assets/data/modules/fault-management/active-alarm-history/table1.json")
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
      .get("assets/data/modules/fault-management/active-alarm-history/table2.json")
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
        headerName: "NWA(%)",
        field: "nwa",
        width: 120,
      }

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
      .get("assets/data/modules/fault-management/active-alarm-history/table3.json")
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
        headerName: "SAP ID",
        field: "SapId",
        width: 140,
      },
      {
        headerName: "Alarm name",
        field: "AlarmName",
        width: 150,
      },
      {
        headerName: "Occurances per day",
        field: "OccurancesPerDay",
        width: 150,
      }
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
      .get("assets/data/modules/fault-management/active-alarm-history/table4.json")
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
        headerName: "Alarm name",
        field: "AlarmName",
        width: 150,
      },
      {
        headerName: "Outage Minutes(HRS)",
        field: "OutageMinutesHRS",
        width: 150,
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
      .get("assets/data/modules/fault-management/active-alarm-history/table5.json")
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
        headerName: "Ageing",
        field: "Ageing",
        width: 150,
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
      },
      {
        headerName: "SA",
        field: "SA2",
        width: 115,
      },
      {
        headerName: "NSA ",
        field: "NSA2",
        width: 130,
      },
      {
        headerName: "Performance Degrading",
        field: "PerformanceDegrading2",
        width: 240,
      }
    ];

    this.datatable.columnDefsServices = this.columnDefsTable5;
  }

  onFilterChangedTable5(value) {
    console.log(value, "value");
    console.log(this.gridOptionsTable5.api.setQuickFilter(value), "valthis.gridOptions.api.setQuickFilter(value)ue");
    this.datatable.gridFilterValueServices = value;
  };

  public gridApiTable6;
  public gridPinnedTable6 = false;
  public gridOptionsTable6: GridOptions;
  public rowDataTable6: any;
  public columnDefsTable6: any[];
  public defaultColDefTable6 = { resizable: true };
  public frameworkComponentsTable6 = {
    dropDownThreeDotRenderer: dropDownList3DotRendererComponent,
    layersIconRender: layersIconRenderComponent,
  };

  public onReadyTable6(params) {
    console.log(params, "onReady");
    this.gridApiTable6 = params.api;
    // params.api.sizeColumnsToFit();
  }

  public httpClientRowDataTable6() {
    this.http
      .get("assets/data/modules/fault-management/active-alarm-history/table6.json")
      .subscribe(data => {
        this.rowDataTable6 = data;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid-without-Pagination";
        this.datatable.rowDataServices = this.rowDataTable6;
        this.datatable.gridPinnedServices = this.gridPinnedTable6;
        this.datatable.gridOptionsServices = this.gridOptionsTable6;
        this.datatable.defaultColDefServices = this.defaultColDefTable6;
      });
  }

  public createColumnDefsTable6() {
    this.columnDefsTable6 = [

      {
        headerName: "Circle",
        field: "Circle",
        width: 140,
        pinned: 'left',
      },
      {
        headerName: "Total Cells",
        field: "TotalCells",
        width: 140,
      },
      {
        headerName: "Total Alarm",
        field: "TotalAlarm",
        width: 140,
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

    this.datatable.columnDefsServices = this.columnDefsTable6;
  }

  onFilterChangedTable6(value) {
    console.log(value, "value");
    console.log(this.gridOptionsTable6.api.setQuickFilter(value), "valthis.gridOptions.api.setQuickFilter(value)ue");
    this.datatable.gridFilterValueServices = value;
  };



}
