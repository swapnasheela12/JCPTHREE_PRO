import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { dropDownThreeDotRendererComponent } from 'src/app/core/components/ag-grid-renders/dropDownThreeDot-renderer.component';
import { FormControl } from '@angular/forms';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { SelectionChangedEvent } from 'ag-grid-community';
import { viewHistoryRendererComponent } from 'src/app/core/components/ag-grid-renders/view-history-renderer.component';


const paths = "JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Sector-Misalignment/WO-Sector-Misalignment";
@Component({
  selector: 'app-sector-misalignment',
  templateUrl: './sector-misalignment.component.html',
  styleUrls: ['./sector-misalignment.component.scss']
})
export class SectorMisalignmentComponent {

  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////

  public paths;
  public sidenavBarStatus;
  public tableWidth;
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: any;
  public columnDefs: any[];
  public rowCount: string;
  public frameworkComponentsSectorMisalignment = {
    statusFlagRenderer: StatusRendererComponent,
    dropDownThreeDotRenderer: dropDownThreeDotRendererComponent,
    viewHistroyRenderer: viewHistoryRendererComponent
  };
  public formControlPageCount = new FormControl();

  public showGlobalOperation: Boolean = false;
  public url: string = "assets/data/report/sector-misalignment/sector-misalignment.json";


  constructor(private datatable: TableAgGridService, private datashare: DataSharingService, private router: Router, private route: ActivatedRoute, private overlayContainer: OverlayContainer, private httpClient: HttpClient) {
    router.events.subscribe((url: any) => console.log(url));
    //this.paths = PATHS;
    this.gridOptions = <GridOptions>{};
    this.createColumnDefs();

    this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });

    this.httpClient.get(this.url)
      .subscribe(data => {
        this.rowData = data;

        console.log(this.rowData);
        this.datatable.rowDataURLServices = this.url;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid-Report";
        this.datatable.rowDataServices = this.rowData;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });
  }

  getSelection() {
    var selectedRows = this.gridOptions.api.getSelectedRows();
    console.log("selectedRows", selectedRows);
  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "Status",
        cellRenderer: this.statusFunc,
        field: "status",
        width: 150,
        pinned: "left"
      },
      {
        headerName: "SAP ID",
        field: "sapid",
        width: 220,
        pinned: "left"
      },
      {
        headerName: "Zone",
        field: "zone",
        width: 120,
      },
      {
        headerName: "Circle",
        field: "circle",
        width: 130,
      },
      {
        headerName: "JC ID",
        field: "jcid",
        width: 160,
      },
      {
        headerName: "Category",
        field: "category",
        width: 200,
      },
      {
        headerName: "Workorder",
        field: "workorder",
        width: 260,
      },
      {
        headerName: "Created On",
        field: "createdon",
        width: 140,
      },
      {
        headerName: "Due Date",
        field: "duedate",
        width: 140,
      },
      {
        headerName: "SLA Violation",
        field: "slaviolation",
        width: 135,
      },
      {
        headerName: "Task Completion",
        cellRenderer: this.progressTaskFunc,
        width: 180,
        pinned: 'right'
      },
      {
        headerName: "",
        cellRenderer: 'viewHistroyRenderer',
        width: 90,
        pinned: 'right',
        // id: "dot-rendered-rep-local"
      }
    ];
    this.datatable.columnDefsServices = this.columnDefs;

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
      var template = '<div class="shared_val" fxLayout="row" fxLayoutAlign="space-between center"> <div class="shared_title">' + status + '</div> <div class="shared_count">+' + params.data.sharecount + '</div> </div>'
    } else {
      barColor = '#828282';
      var template = '<div fxLayout="row" fxLayoutAlign="space-between center"> <div class="shared_title">-</div> </div>'
    }
    ;
    return template;
  };

  //END table search

  //////////////////

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }


  onSelectionChanged(event: SelectionChangedEvent) {
    let lengthOfSelectedRow = event.api.getSelectedRows().length;
    console.log("console.log(lengthOfSelectedRow);", lengthOfSelectedRow);
    if (1 < lengthOfSelectedRow) {
      console.log("row clicked", event)
    }
  }

  selectionChanged(event: SelectionChangedEvent) {
    let lengthOfSelectedRow = event.api.getSelectedRows().length;
    console.log("console.log(lengthOfSelectedRow);", lengthOfSelectedRow);
    if (1 < lengthOfSelectedRow) {
      console.log("row clicked", event)
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.paginationGoToPage(4);

  }

  onPageSizeChanged(newPageSize) {
    this.gridApi.paginationSetPageSize(Number(newPageSize.value));
  }

  statusFunc(params) {
    var status = params.value;
    var barColor = '';
    if (status == "Completed" || status == "Successful") {
      barColor = '#39b54a';
    } else if (status == "In Progress" || status == "Started") {
      barColor = '#ff8000';
    } else if (status == "Not Started") {
      barColor = '#ff8000';
    } else {
      barColor = '#f21400';
    }

    return '<span class="md-line-status" style="background-color: ' +
      barColor +
      ';"></span><div class="md-two-lines-cell align-v-middle"><div class="values color-87">' +
      status + '</div></div>';
  }

  progressTaskFunc(params) {
    var taskcompletion = params.data.taskcompletion;
    var taskprogress = params.data.taskprogress;
    var ratingnumber = params.data.ratingnumber;
    // var taskprogresscolor = params.data.taskColor;

    var template1 = '<div class="jcp-two-lines-progress">' + '<div class="values">' + ratingnumber + '</div>' +
      ' <div class="progress"> <div class="progress-bar bg-success" style="width:' + taskprogress + '%"></div> </div></div>';

    var template2 = '<div class="jcp-two-lines-progress">' + '<div class="values">' + ratingnumber + '</div>' +
      ' <div class="progress"> <div class="progress-bar bg-warning" style="width:' + taskprogress + '%"></div> </div></div>';

    var template3 = '<div class="jcp-two-lines-progress">' + '<div class="values">' + ratingnumber + '</div>' +
      ' <div class="progress"> <div class="progress-bar bg-danger" style="width:' + taskprogress + '%"></div> </div></div>';
    if (taskcompletion === "Completed" || taskcompletion === "Successful") {
      return template1;
    } else if (taskcompletion === "Pending") {
      return template2;
    } else {
      return template3;
    }
  }

  cellClickedDetails(evt) {
    if (evt.value) {
      this.router.navigate(["/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Sector-Misalignment/WO-Sector-Misalignment"]);
    }

  }

}
