import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { COLUMN_DEFS } from 'src/app/modules/components/column-rendering/column-defs.constant';
import { AgGridTreeService } from 'src/app/core/components/ag-grid-tree/ag-grid-tree.component.service';
import { MatSidenav } from '@angular/material/sidenav';
import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { dropDownThreeDotRendererComponent } from 'src/app/core/components/ag-grid-renders/dropDownThreeDot-renderer.component';
import { FormControl } from '@angular/forms';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';

const COLUMNDEFS = COLUMN_DEFS;
@Component({
  selector: 'app-wo-sector-misalignment',
  templateUrl: './wo-sector-misalignment.component.html',
  styleUrls: ['./wo-sector-misalignment.component.scss']
})
export class WoSectorMisalignmentComponent {
  url: string = "assets/data/report/sector-misalignment/wo-sector-misalignment.json"
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
  public frameworkComponentsWOSectorComponent = {
    statusFlagRenderer: StatusRendererComponent,
    dropDownThreeDotRenderer: dropDownThreeDotRendererComponent
  };
  public paginationValues: number[] = [10, 20, 30, 40];
  public formControlPageCount = new FormControl();

  public showGlobalOperation: Boolean = false;
  woHeader = [
    {
      "label": "Category",
      "value": "Sector Misalignment"
    },
    {
      "label": "SAP ID",
      "value": "I-MU-MUMB-0306"
    },
    {
      "label": "Template",
      "value": "Sector Misalignment"
    },
    {
      "label": "Work Order Creation Date",
      "value": "24 Sep, 2019"
    },
    {
      "label": "Planned End Date",
      "value": "30 Sep, 2019"
    },
    {
      "label": "Work Order Status",
      "value": "In Progress"
    }
  ];
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
        headerName: 'Status',
        field: 'status',
        pinned: 'left',
        width: 150
      },
      {
        headerName: 'Task Id',
        field: 'taskId',
        pinned: 'left',
        width: 150
      },
      {
        headerName: 'Task Category',
        field: 'taskcategory',
        pinned: 'left',
        width: 150
      },
      {
        headerName: 'Priority',
        field: 'Priority',
        pinned: 'left',
        width: 150
      },
      {
        headerName: 'Due Date',
        field: 'duedate',
        pinned: 'left',
        width: 150
      },
      {
        headerName: 'Assigned To',
        field: 'assignedtoname',
        pinned: 'left',
        width: 150
      },
      {
        headerName: 'last Modified',
        field: 'lastmodified',
        pinned: 'right',
        width: 150
      },
      {
        headerName: 'Task Completion',
        field: 'taskCompletion',
        pinned: 'right',
        width: 150
      },
      {
        headerName: "",
        cellRenderer: 'dropDownThreeDotRenderer',
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

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.paginationGoToPage(4);

  }

  onPageSizeChanged(newPageSize) {
    this.gridApi.paginationSetPageSize(Number(newPageSize.value));
  }

  progressTaskFunc(params) {
    var taskcompletion = params.data.perrating;
    var taskprogress = params.data.ratingnumber;
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
}
