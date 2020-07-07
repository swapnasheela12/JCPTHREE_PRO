// import { DropDowRBRendererComponent } from './../../reports-dashboards/my-reports/button-renderer.component';
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
  public frameworkComponentsMyReport = {
    // buttonRenderer: DropDowRBRendererComponent,
  };

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
        pinned: 'left'
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
        width: 150
      }, {
        headerName: "Vendor",
        field: "vendor",
        width: 120
      },
      {
        headerName: "Created By",
        field: "creatorFirstName",
        width: 130
      }, {
        headerName: "Created Date",
        field: "creationTime",
        cellRenderer: function (params) {
          // return '<div>' + $filter('date')(params.data.creationTime,
          //   "dd MMM, yyyy") + '</div>';
        },
        width: 120
      }, {
        headerName: "Modified By",
        field: "modifierFirstName",
        width: 120
      }, {
        headerName: "Modified Date",
        field: "modificatioTime",
        cellRenderer: function (params) {
          // return '<div>' + $filter('date')(params.data.modificatioTime,
          //   "dd MMM, yyyy") + '</div>';
        },
        width: 150
      }, {
        headerName: "Status",
        width: 130,
        cellRenderer: this.shareStatus,
        suppressSorting: true,
        suppressMenu: true,
      }, {
        headerName: "",
        suppressSorting: true,
        suppressMenu: true,
        cellRenderer: this.createMenuTemp,
        width: 80,
        pinned: 'right'
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
    } else {
      barColor = '#828282';
    }
    var template = '<div><span class="md-line-status" style="background-color:' + barColor + '"></span><span>' + data.status + '</span><span class="email-count" ng-if="data.sharecount!=0">+' + data.sharecount + '</span></div>';
    return template;
  };


  createMenuTemp(params) {
    // var data = params.data;
    // var template = '<mat-menu ng-if="vm.vertexVisibilty" >' +
    //   '<mat-button class="md-icon-button" href="" aria-label="Actions">' +
    //   '<mat-icon aria-label="Actions" class="zmdi zmdi-more-vert zmdi-hc-lg" ng-click="vm.openTableMenu($mdOpenMenu, $event)"></mat-icon>' +
    //   '</mat-button>' +
    //   '<mat-menu-content>' +
    //   '<mat-menu-item>' +
    //   '<mat-button ng-click="vm.onSelectionEditReport(data);">Edit</mat-button>' +
    //   '</mat-menu-item>' +
    //   '<mat-menu-item>' +
    //   '<mat-button ng-click="vm.onSelectionCloneReport(data)">Clone</mat-button>' +
    //   '</mat-menu-item>' +
    //   '<mat-menu-item>' +
    //   '<mat-button  ng-click="vm.dashboardSelectedListShare($event, data);">Share</mat-button>' +
    //   '</mat-menu-item>' +
    //   '<mat-menu-item>' +
    //   '<mat-button ng-click="vm.deleteFromlist();">Delete</mat-button>' +
    //   '</mat-menu-item>' +
    //   '</mat-menu-content>' +
    //   '</mat-menu>';
    // return template;
  }

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


  openDialog(): void {
    this.router.navigate(['/JCP/Reports-and-Dashboard/Report-Wizard']);
  };

}
