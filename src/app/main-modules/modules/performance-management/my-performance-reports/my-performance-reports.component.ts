import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { GridOptions, GridApi } from 'ag-grid-community';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { dropDownThreeDotRendererComponent } from './../../../../core/components/ag-grid-renders/dropDownThreeDot-renderer.component';
import { Router } from '@angular/router';
import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commanPopup/common-popup/common-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

const HEADER_PERFORMANCE_REPORTS = [
  {
    headerName: "",
    width: 30,
    pinned: 'left',
    checkboxSelection: function(params) {
      return params.columnApi.getRowGroupColumns().length === 0;
    },
    cellClass: 'lock-pinned',
  },
  {
    headerName: "Name",
    field: "name",
    width: 220,
    pinned: 'left',
    cellClass: 'lock-pinned',
  },
  {
    headerName: "Type",
    field: 'type',
    width: 180
  },
  {
    headerName: "Generation",
    field: 'generation',
    width: 180,
  },
  {
    headerName: "Domain",
    field: "domain",
    width: 140
  },
  {
    headerName: "Vendor",
    field: "vendor",
    width: 140
  },
  {
    headerName: "Created By",
    field: 'createdby',
    width: 160
  },
  {
    headerName: "Created Date",
    field: 'createddate',
    width: 160,
    valueFormatter: function(params){
      return moment(params.value).format('LL')
    }
  },
  {
    headerName: "Progress",
    width: 160
  },
  {
    headerName: "Status",
    width: 120,
    suppressSorting: true,
    suppressMenu: true
  },
  {
    headerName: "File Size",
    field: "filesize",
    width: 120
  },
  {
    headerName: "",
    suppressMenu: true,
    suppressSorting: true,
    width: 90,
    colId: 'dots-id'
  }
];

const PATHS = [
  { changeImpactAnalysis: "JCP/Modules/Performance-Management/My-Performance-Reports/Change-Impact-Analysis"}
]

@Component({
  selector: 'app-my-performance-reports',
  templateUrl: './my-performance-reports.component.html',
  styleUrls: ['./my-performance-reports.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MyPerformanceReportsComponent implements OnInit, OnDestroy {
  public gridMyPerformanceColumnDefs: any[];
  public gridMyPerformanceRowData: object;
  public gridMyPerformanceGridOptions : GridOptions;
  public frameworkComponentsMyPerformanceReports;
  showSearchInput: boolean;
  searchGrid = '';
  public sidenavBarStatus;
  public gridPinned = true;
  private gridApi;
  public gridColumnApi;
  public title = 'My Performance Reports';
  public url: string = "assets/data/modules/performance_management/my-performance-report/my-performance-report.json";
  public frameworkComponentsReportBuilder : object;
  private paginationPageSize = 10;
  private messageSubscription: Subscription;

  public fitColumns() {
    if (this.gridMyPerformanceGridOptions.api && this.gridMyPerformanceRowData) {
      setTimeout(() => {
        this.gridMyPerformanceGridOptions.api.sizeColumnsToFit();
      }, 500);
    }
  }

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    private datashare: DataSharingService
  ) {
    this.gridMyPerformanceGridOptions = <GridOptions>{};
    this.frameworkComponentsReportBuilder = {
      'VerticaldotRenderer': dropDownThreeDotRendererComponent
    };
    this.paginationPageSize = 10;
    this.messageSubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });
  }

  ngOnInit(): void {
    this.createColumnDefs();
    this.getMyPerformanceReportsData();
  }

  get gridAPI(): GridApi {
    return this.gridApi;
  }

  get PaginationPageSize(): number {
    return this.paginationPageSize;
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  toggleSearch() {
    this.showSearchInput = !this.showSearchInput;
  };

  public createColumnDefs() {
    this.gridMyPerformanceColumnDefs = HEADER_PERFORMANCE_REPORTS;
    this.gridMyPerformanceColumnDefs[9].cellRenderer = this.shareStatus;
    this.gridMyPerformanceColumnDefs[8].cellRenderer = this.progressTaskFunc;
    this.gridMyPerformanceColumnDefs[11].cellRenderer = 'VerticaldotRenderer';
  }

  defaultColDef = {
    resizable: false,
    suppressRowClickSelection: true,
    suppressCellSelection: true
  };
  public getMyPerformanceReportsData() {
    this.http.get(this.url)
      .subscribe(data => {
        this.gridMyPerformanceRowData = data;       
    });
  }

  onFilterChanged(value) {
    this.gridMyPerformanceGridOptions.api.setQuickFilter(value);
  };

  shareStatus(params) {
    if (!params.data)
      return '';
    var status = params.data.status;
    var barColor = '';
    if (status == "Shared") {
      barColor = '#4188de';
      var template = '<div class="shared_val" fxLayout="row" fxLayoutAlign="space-between center"> <div class="shared_title">' + status + '</div> <div class="shared_count">+' + params.data.sharecount + '</div> </div>'
    } else {
      barColor = '#828282';
      var template = '<div fxLayout="row" fxLayoutAlign="space-between center"> <div class="shared_title">-</div> </div>'
    }
    ;
    return template;
  };

  progressTaskFunc(params) {
    var taskcompletion = params.data.progressby;
    var taskprogress = params.data.progressbar;
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

  onRowClicked(evt) {
      if (evt.event.target.localName == 'mat-icon') {
        return false;
      }
      if(evt.data.type =='Pre-Post Report'){
        this.router.navigate([PATHS[0].changeImpactAnalysis]);
      }
  }

  onCellClicked(evt) {
    if (evt.node.data) {
      if (evt.column.colDef.colId == 'dots-id') {
        return false;
      } else {
        this.router.navigate([PATHS[0].changeImpactAnalysis]);
      }
    }
  }

  openUpdateDialog(): void {
    const message = `Are you sure you want to update the Admin Settings?`;
    const image = 'warning';
    const snackbarMode = 'warning';
    const snackbarText = 'Admin Settings Updated Successfully.';
    const dialogData = new CommonDialogModel("Warning!", message, image, snackbarMode, snackbarText);
    const dialogRef = this.dialog.open(CommonPopupComponent, {
      data: dialogData
    });
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}