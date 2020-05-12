import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSelect } from '@angular/material/select';
import { HttpClient } from "@angular/common/http";


// ag grid
import * as agGrid from 'ag-grid-community';
import { GridOptions, GridCore, GridApi, ColumnApi, } from "@ag-grid-community/all-modules";
// import { GridOptions } from "ag-grid/main";
// import {Grid} from "ag-grid-community";
// import { AllCommunityModules } from '@ag-grid-community/all-modules';
// import { AllCommunityModules } from 'ag-grid-community';
import { ButtonRendererComponent } from './button-renderer.component';
import { CreateReportComponent } from '../reports-wizard/create-report/create-report.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { MatSidenav } from '@angular/material/sidenav';

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
  selector: 'app-my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.scss']
})
export class MyReportsComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////
  public gridApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public showGrid: boolean;
  public rowData: any;
  public columnDefs: any[];
  public rowCount: string;
  public frameworkComponentsMyReport = {
    buttonRenderer: ButtonRendererComponent,
  };
  public widthOfRowData: any;
  
  // ///////my report tabel//////////
  public products;
  show: any;
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

  constructor(private location: Location, private router: Router, private overlayContainer: OverlayContainer, private httpClient: HttpClient, public dialog: MatDialog) {
    router.events.subscribe((url: any) => console.log(url));
    console.log(router.url)

    this.gridOptions = <GridOptions>{};
    this.createRowData();
    this.createColumnDefs();
    this.showGrid = true;

  }


  private createRowData() {

    this.httpClient
      .get("assets/data/report/my-report.json")
      .subscribe(data => {
        this.rowData = data;
        console.log(this.rowData, "this.rowData");

      });
    
  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "Report Name",
        field: "reportname",
        width: 320
      }, {
        headerName: "Report Measure",
        field: "reportmeasure",
        width: 210
      }, {
        headerName: "Report Category",
        field: "reportcategory",
        width: 230
      },
      {
        headerName: "Progress",
        cellRenderer: this.progressTaskFunc,
        width: 180
      },
      {
        headerName: "Created Date",
        field: "createddate",
        width: 190
      }, {
        headerName: "",
        cellRenderer: 'buttonRenderer',
        width: 140
      }
    ];
  }

  defaultColDef = { resizable: true };

  public onReady(params) {
    console.log(params, "onReady");
    this.gridApi = params.api;

    this.gridApi.refreshCells(this.rowData);
    setInterval(() => {
      // params.api.setRowData(this.rowData);
      params.api.sizeColumnsToFit();
    }, 1000);
  }

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
    console.log(this.sidenav, "this.sidenav YYYYYYYYYYYYYY");
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


  openDialog(): void {
    this.router.navigate(['/Home/Reports-and-Dashboard/Report-Wizard']);
  };

}



