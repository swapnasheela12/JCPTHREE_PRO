import { GridApi, GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectionChangedEvent } from 'ag-grid-community';
import { Subject, Subscription } from 'rxjs';
import { dropDownThreeDotRendererComponent } from 'src/app/core/components/ag-grid-renders/dropDownThreeDot-renderer.component';
import { SuccessfulModalComponent } from 'src/app/core/components/commonPopup/successful-modal/successful-modal.component';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
@Component({
  selector: 'app-site-sla-configuration',
  templateUrl: './site-sla-configuration.component.html',
  styleUrls: ['./site-sla-configuration.component.scss']
})
export class SiteSlaConfigurationComponent implements OnDestroy {
  url: string = "assets/data/report/sector-misalignment/wo-sector-misalignment.json"
  // @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: any;
  public columnDefs: any[];
  public digitalFormColDefs: any[];
  public frameworkComponentsTaskDetails = {
    statusFlagRenderer: StatusRendererComponent,
    dropDownThreeDotRenderer: dropDownThreeDotRendererComponent
  };
  public searchGrid = '';
  public paginationValues: number[] = [10, 20, 30, 40];
  public formControlPageCount = new FormControl();
  public gridFilterValueServices = {};
  public showGlobalOperation: boolean = true;
  public messageSubscription: Subscription;
  public sidenavBarStatus;
  public defaultColDef = { resizable: true };
  public tableWidth;
  public gridPinned = false;

  paginationPageSize = 50;

  woHeader: Array<any> = [
    {
      id: 1,
      "label": "Site Type",
      "value": "gNodeB"
    },
    {
      id: 2,
      "label": "Last Modified Date",
      "value": "29 Nov 2020"
    },
    {
      id: 3,
      "label": "Modified by",
      "value": "Navneet Kaushik"
    }
  ];
  public destroySubscription: Subscription = new Subscription();
  trackHero(index, woHeader) {
    return woHeader ? woHeader.id : undefined;
  }

  onReadyModeUpdate(params) {
    this.calculateRowCount();
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.calculateRowCount();
  }
  public calculateRowCount() {
    if (this.gridOptions.api && this.rowData) {
      setTimeout(() => {
        this.gridOptions.api.sizeColumnsToFit();
      }, 1000);
    }
  }

  constructor(public dialog: MatDialog, private datatable: TableAgGridService, private datashare: DataSharingService, private router: Router,
    private httpClient: HttpClient) {

    this.gridOptions = <GridOptions>{};
    //this.rowSelection = 'multiple';
    this.createColumnDefs();
    this.createDigitalFormsColumnDefs();

    this.messageSubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });
    this.getMyTaskDetails();
  }

  getMyTaskDetails() {
    this.httpClient.get('assets/data/administration/site-sla-configuration/site-sla-configuration.json')
      .subscribe(data => {
        this.rowData = data;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid";
        this.datatable.gridPinnedServices = this.gridPinned;
        this.datatable.rowDataServices = this.rowData;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });
  }

  onChange(event) {
    console.log(event)
  }

  public createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "R4G State",
        field: "r4GState",
        width: 200,
        pinned: "left"
      },
      {
        headerName: "Maintainance Point",
        field: "maintainancePoint",
        width: 180,
      },
      {
        headerName: "JIO Center",
        field: "jioCenter",
        width: 150,
      },
      {
        headerName: "Site Type",
        field: "siteType",
        width: 150,
      },
      {
        headerName: "Last Updated On",
        field: "lastUpdatedOn",
        width: 170,
      },
      {
        headerName: "Rule ID",
        field: "ruleID",
        width: 250,
      },
      {
        headerName: "Locked Stage",
        field: "lockedStage",
        width: 180,
      },
      {
        headerName: "",
        cellRenderer: 'dropDownThreeDotRenderer',
        width: 100,
        pinned: 'right'

      }
    ];
    this.datatable.columnDefsServices = this.columnDefs;
  }



  public createDigitalFormsColumnDefs() {
    this.digitalFormColDefs = [
      {
        headerName: "Status",
        cellRenderer: this.taskStatus,
        field: "",
        width: 90
      },
      {
        headerName: "Milestone",
        field: "mileStone",
        width: 200,
      },
      {
        headerName: "Task",
        field: "task",
        width: 350,
      },
      {
        headerName: "Form Name",
        field: "formName",
        width: 200,
      },
      {
        headerName: "Form Owner",
        field: "formOwner",
        width: 200,
      }
    ]
  }

  public eventsSubject: Subject<any> = new Subject();
  onFilterChanged(value) {
    console.log("value", value)
    this.gridOptions.api.setQuickFilter(value);
  };

  statusFunc(params) {
    var status = params.value;
    var barColor = '';
    if (status == "Completed") {
      barColor = '#60DD5C';
    } else if (status == "In Progress" || status == "Started") {
      barColor = '#F8C93A';
    } else if (status == "Rejected") {
      barColor = '#F8C93A';
    } else if (status == "Re-Assigned") {
      barColor = '#5D97E6';
    } else {
      barColor = '#8A8A8A';
    }
    return '<span class="status-bar" style="font-size: 13px; font-family: lato Regular; background-color: ' +
      barColor +
      ';">' +
      status + '</span>';
  }

  taskStatus(params) {
    var status = params.value;
    var barColor = '';
    if (status == "Completed") {
      barColor = '#60DD5C';
    } else if (status == "In Progress" || status == "Started") {
      barColor = '#F8C93A';
    } else if (status == "Rejected") {
      barColor = '#F8C93A';
    } else if (status == "Re-Assigned") {
      barColor = '#5D97E6';
    } else {
      barColor = '#8A8A8A';
    }
    return '<span class="status-bar" style="width: 7px; height: 31px; border-radius: 0;margin-top: 9px; background-color: ' +
      barColor +
      ';">' + '</span>' + '<mat-icon class="mx-2 file-img" fxFlex="5" style="color: #1278D7; font-size: 17px; position: relative; bottom: 7px" aria-label="search">' +
      '<span class="ic ic-files-empty">' + '</span>' +
      ' </mat-icon>';
  }


  show: boolean;
  toggleSearch() {
    this.show = !this.show;
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }


  onSelectionChanged(event: SelectionChangedEvent) {
    let lengthOfSelectedRow = event.api.getSelectedRows().length;
    if (1 < lengthOfSelectedRow) {
    }
  }

  selectionChanged(event: SelectionChangedEvent) {
    let lengthOfSelectedRow = event.api.getSelectedRows().length;
    if (1 < lengthOfSelectedRow) {
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.calculateRowCount();
    params.api.paginationGoToPage(4);
  }

  onPageSizeChanged(newPageSize) {
    this.gridApi.paginationSetPageSize(Number(newPageSize.value));
  }

  get PaginationPageSize(): number {
    return this.paginationPageSize;
  }

  get gridAPI(): GridApi {
    return this.gridApi;
  }

  autoAssign() {
    const message = {
      message: `Task Completed successfully.`,
      showMyTasks: true
    }
    this.dialog.open(SuccessfulModalComponent, {
      data: message,
    });
  }

  onCellClicked(evt) {
    if (evt.value) {
      this.router.navigate(["/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Sector-Misalignment/WO-Sector-Misalignment/Execution-Task"]);
    }
  }

  createSLA() {
    this.router.navigate(["/JCP/Administration/Platform-Administration/Plan-To-Build/gNodeB/Site-SLA-Configuration/Create-Site-Sla-Configuration"]);
  }

  ngOnDestroy() {
    this.destroySubscription.unsubscribe();
  }
}


