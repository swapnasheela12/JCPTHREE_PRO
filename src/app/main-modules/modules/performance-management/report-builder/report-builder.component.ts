import { CommonDialogModel, CommonPopupComponent } from 'src/app/common/common-popup/common-popup.component';
import { VerticaldotRendererComponent } from './../kpi-editor/renderer/verticaldot-renderer.component';
import { StatusRendererComponent } from './../kpi-editor/renderer/status-renderer.component';
// import { CommonDialogModel, CommonPopupComponent } from './../../../common/common-popup/common-popup.component';
// import { StatusRendererComponent } from './../../modules/performance-management/kpi-editor/renderer/status-renderer.component';
// import { VerticaldotRendererComponent } from './../../modules/performance-management/kpi-editor/renderer/verticaldot-renderer.component';
// import { DropDowRBRendererComponent } from './../../reports-dashboards/my-reports/button-renderer.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSelect } from '@angular/material/select';
import { HttpClient } from "@angular/common/http";
import * as moment from 'moment';

// ag grid
import * as agGrid from 'ag-grid-community';
import { GridOptions, GridCore, GridApi, ColumnApi,SelectionChangedEvent } from "@ag-grid-community/all-modules";
// import { GridOptions } from "ag-grid/main";
// import {Grid} from "ag-grid-community";
// import { AllCommunityModules } from '@ag-grid-community/all-modules';
// import { AllCommunityModules } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { MatSidenav } from '@angular/material/sidenav';
import { DataSharingService } from 'src/app/_services/data-sharing.service';

declare var $: any;

interface reportsMeasure {
  value: string;
  viewValue: string;
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-report-builder',
  templateUrl: './report-builder.component.html',
  styleUrls: ['./report-builder.component.scss']
})
export class ReportBuilderComponent implements OnInit {

  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////
  public sidenavBarStatus;
  public tableWidth;
  public gridApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: any;
  public columnDefs: any[];
  public rowCount: string;
  public frameworkComponentsReportBuilder = {
    // buttonRenderer: DropDowRBRendererComponent,
    statusFlagRenderer: StatusRendererComponent,
    VerticaldotRenderer: VerticaldotRendererComponent
  };
  public paginationValues: [
    { value: '10' },
    { value: '20' },
    { value: '30' },
    { value: '40' }
  ];

  public showGlobalOperation:Boolean = false;
  public rowSelection;

  // ///////my report tabel//////////
  public products;

  // ///////my report tabel//////////
  ///////report measure/////////////
  public reportMeasureSelected = "Performance Management";
  @ViewChild(MatSelect, { static: true }) _mySelect: MatSelect;
  reportsMeasureList: reportsMeasure[] = [
    { value: 'Configuration Management', viewValue: 'Configuration Management' },
    { value: 'LSMR', viewValue: 'LSMR' },
    { value: 'Performance Management', viewValue: 'Performance Management' },
    { value: 'Work Orders', viewValue: 'Work Orders' }
  ];
  ///////report measure/////////////

  onReadyModeUpdate(params) {
    this.calculateRowCount();
  }

  public calculateRowCount() {
    if (this.gridOptions.api && this.rowData) {
      // setTimeout(() => {
      //   this.gridOptions.api.sizeColumnsToFit();
      // }, 1000);
    }
  }

  public onReady(params) {
    console.log(params, "onReady");
    this.gridApi = params.api;
    this.calculateRowCount();
  }



  constructor(private datashare: DataSharingService, private location: Location, private router: Router, private overlayContainer: OverlayContainer, private httpClient: HttpClient, public dialog: MatDialog) {
    router.events.subscribe((url: any) => console.log(url));

    this.gridOptions = <GridOptions>{};
    this.rowSelection = 'multiple';
    this.httpClientRowData();
    this.createColumnDefs();

    this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
      this.calculateRowCount();
    });

  }

  private httpClientRowData() {
    this.httpClient
      .get("assets/data/modules/performance_dashboard/report_builder.json")
      .subscribe(data => {
        this.rowData = data;
      });
  }

  private createColumnDefs() {
    this.columnDefs = [

      {
        headerName: "Name",
        field: "reportName",
        width: 250,
        pinned: 'left',
        checkboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        headerCheckboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
      }, {
        headerName: "Type",
        field: "reportType",
        width: 150
      }, {
        headerName: "Generation",
        field: "generation",
        width: 150
      }, {
        headerName: "Domain",
        field: "domain",
        width: 120
      }, {
        headerName: "Vendor",
        field: "vendor",
        width: 120
      },
      {
        headerName: "Created By",
        field: "creatorFirstName",
        width: 150
      }, {
        headerName: "Created Date",
        field: "creationTime",
        cellRenderer: function (params) {
          return moment(params.data.creationTime).format('DD MMM, YYYY');
        },
        width: 150
      }, {
        headerName: "Modified By",
        field: "modifierFirstName",
        width: 160
      }, {
        headerName: "Modified Date",
        field: "modificationTime",
        cellRenderer: function (params) {
          return moment(params.data.modificationTime).format('DD MMM, YYYY');
        },
        width: 180
      }, {
        headerName: "Status",
        width: 180,
        cellRenderer: this.shareStatus,
        suppressSorting: true,
        suppressMenu: true,
      }, {
        headerName: "",
        cellRenderer: 'VerticaldotRenderer',
        width: 80,
        pinned: 'right',
        id: "dot-rendered-kpi-local"
      }
    ];
  }

  defaultColDef = { resizable: true };
  searchGrid = '';
  onFilterChanged(value) {
    this.gridOptions.api.setQuickFilter(value);
  };
  show: any;
  toggleSearch() {
    this.show = !this.show;
  };

  shareStatus(params) {
    var data = params.data;
    if (!params.data)
      return '';
    var status = params.data.status;
    var barColor = '';
    if (status == "Shared") {
      barColor = '#4188de';
      var template = '<div class="shared_val" fxLayout="row" fxLayoutAlign="space-between center"> <div class="shared_title">'+status+'</div> <div class="shared_count">+'+params.data.sharecount+'</div> </div>'
    } else {
      barColor = '#828282';
      var template = '<div fxLayout="row" fxLayoutAlign="space-between center"> <div class="shared_title">-</div> </div>'
    }
   ;
    return template;
  };


  
  //END table search



  //////////////////

  progressTaskFunc(params) {
    var taskcompletion = params.data.progressby;
    var taskprogress = params.data.progressbar;
    // var taskprogresscolor = params.data.taskColor;

    var template1 = '<div class="jcp-two-lines-progress">' + '<div class="values">' + taskcompletion + '</div>' +
      ' <div class="progress"> <div class="progress-bar bg-success" style="width:' + taskprogress + '%"></div> </div></div>';

    var template2 = '<div class="jcp-two-lines-progress">' + '<div class="values">' + taskcompletion + '</div>' +
      ' <div class="progress"> <div class="progress-bar bg-warning" style="width:' + taskprogress + '%"></div> </div></div>';

    var template3 = '<div class="jcp-two-lines-progress">' + '<div class="values">' + taskcompletion + '</div>' +
      ' <div class="progress"> <div class="progress-bar bg-danger" style="width:' + taskprogress + '%"></div> </div></div>';
    if (taskcompletion == "Generated") {
      return template1;
    } else if (taskcompletion == "#5 in Queue") {
      return template2;
    } else {
      return template3;
    }
  }

  // onGridReadyMyReport() {
  //   this.httpClient
  //     .get("assets/data/report/my-report.json")
  //     .subscribe(data => {
  //       this.rowData = data;
  //       console.log(this.rowData, "this.rowData");

  //     });
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {

    // this.onGridReadyMyReport();
    // ///////mat seletec report measure////////////
    this._mySelect.openedChange
      .subscribe((opened) => {
        if (!opened) {
          this.overlayContainer.getContainerElement().classList.remove('select-overlay');
        }
      });
    // ///////mat seletec report measure////////////
  }
  beforeOpen() {
    this.overlayContainer.getContainerElement().classList.add('select-overlay');
  }


  selectionChanged(event: SelectionChangedEvent) {
    console.log(event,"hi lol");
    if (1 < event.api.getSelectedRows().length) {
      console.log("hi lol");
      
      this.showGlobalOperation = true;
    }
  }

  openBulkDeleteDialog():void {
    const message = `Are you Sure you want to perform this action?`;
    const image = 'warning';
    const dialogData = new CommonDialogModel("Warning!", message, image);
    const dialogRef = this.dialog.open(CommonPopupComponent, {
      data: dialogData
    });
  }


}
