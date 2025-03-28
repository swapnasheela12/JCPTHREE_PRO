import { TableAgGridService } from './../../../core/components/table-ag-grid/table-ag-grid.service';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSelect } from '@angular/material/select';
import { HttpClient } from "@angular/common/http";
import { GridOptions, GridCore } from "@ag-grid-community/all-modules";
import { ButtonRendererComponent } from './button-renderer.component';
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
  selector: 'app-my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.scss']
})
export class MyReportsComponent implements OnInit {
  @Input() commonTableAggrid: TemplateRef<any>;

  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////
  public sidenavBarStatus;
  public tableWidth;
  public gridApi;
  public gridPinned = false;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: any;
  public columnDefs: any[];
  public rowCount: string;
  public frameworkComponentsMyReport = {
    buttonRenderer: ButtonRendererComponent,
  };
  url = "assets/data/report/my-report.json";
 
  public products;
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

  constructor(private datatable: TableAgGridService, private datashare: DataSharingService, private location: Location, private router: Router, private overlayContainer: OverlayContainer, private httpClient: HttpClient, public dialog: MatDialog) {
    router.events.subscribe((url: any) => console.log(url));

    this.gridOptions = <GridOptions>{};
    this.httpClientRowData();
    this.createColumnDefs();

    this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
      this.calculateRowCount();
    });

  }

 
  private httpClientRowData() {
    this.httpClient
      .get("assets/data/report/my-report.json")
      .subscribe(data => {
        this.rowData = data;
        this.datatable.rowDataURLServices = this.url;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid";
        this.datatable.rowDataServices = this.rowData;
        this.datatable.gridPinnedServices = this.gridPinned;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });
  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "Report Name",
        field: "reportname",
        width: 320,
        pinned: 'left'
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

    this.datatable.columnDefsServices = this.columnDefs;
  }

  defaultColDef = { resizable: true };

  searchGrid = '';
  onFilterChanged(value) {
    console.log(value,"value");
    console.log(this.gridOptions.api.setQuickFilter(value),"valthis.gridOptions.api.setQuickFilter(value)ue");
    this.datatable.gridFilterValueServices = value;
  };
  show: any;
  toggleSearch() {
    this.show = !this.show;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  ngOnInit() {

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
    this.router.navigate(['/JCP/Reports-and-Dashboard/Report-Wizard']);
  };

}



