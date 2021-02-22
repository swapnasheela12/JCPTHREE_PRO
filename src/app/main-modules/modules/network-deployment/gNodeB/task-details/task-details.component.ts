import { takeUntil } from 'rxjs/operators';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSelect } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { dropDownThreeDotRendererComponent } from 'src/app/core/components/ag-grid-renders/dropDownThreeDot-renderer.component';
import { Subscription, Subject, ReplaySubject } from 'rxjs';
import { ViewChild, Input, TemplateRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GridOptions, GridCore, SelectionChangedEvent } from 'ag-grid-community';
import * as _ from 'lodash';
import { inputRendererComponent } from 'src/app/core/components/ag-grid-renders/input-renderer.component';
import { DropDownRendererComponent } from './dropDown-renderer.component';
import { MatDialog } from '@angular/material/dialog';
import { SuccessfulModalComponent } from 'src/app/core/components/commonPopup/successful-modal/successful-modal.component';
declare var $: any;

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  @Input() commonTableAggrid: TemplateRef<any>;
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptionsMyTask: GridOptions;
  public gridOptionsTeamTask: GridOptions;
  public gridOptionsExceptional: GridOptions;
  public gridOptionsSLABreach: GridOptions;
  public rowData: any;
  public rowDataTeams: any;
  public rowDataSLABreach: any;
  public rowDataExpTask: any;
  public columnDefs: any[];
  public columnDefsTeams: any[];
  public columnDefsExpTask: any[];
  public columnDefsSLABreach: any[];
  public rowCount: string;
  public defaultColDef = { resizable: true };
  public sidenavBarStatus;
  public tableWidth;
  public gridPinned = false;
  public messageSubscription: Subscription;
  public gridFilterValueServices = {};
  public frameworkComponentsTaskDetails = {
    dropdownRenderer: DropDownRendererComponent,
    inputRenderer: inputRendererComponent,
  };
  public searchGrid = '';

  public taskDetails = [
    {
      "taskStatusImg": "ic ic-Total-Task",
      "taskCount": "78203",
      "taskAssigned": "Total Task"
    },
    {
      "taskStatusImg": "ic ic-New-Task",
      "taskCount": "4356",
      "taskAssigned": "New Task"
    },
    {
      "taskStatusImg": "ic ic-In-Progress-Task",
      "taskCount": "24567",
      "taskAssigned": "In-Progress"
    }, {
      "taskStatusImg": "ic ic-Completed-Task",
      "taskCount": "36678",
      "taskAssigned": "Completed"
    }, {
      "taskStatusImg": "ic ic-Tejected-Task",
      "taskCount": "12345",
      "taskAssigned": "Rejected"
    }
  ]


  public opens = 'right';
  public drops = 'down';

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, private datatable: TableAgGridService, private datashare: DataSharingService, private router: Router,
    private overlayContainer: OverlayContainer, private httpClient: HttpClient) {

    this.gridOptionsMyTask = <GridOptions>{};
    this.gridOptionsTeamTask = <GridOptions>{};
    this.gridOptionsExceptional = <GridOptions>{};
    this.gridOptionsSLABreach = <GridOptions>{};
    //this.rowSelection = 'multiple';
    this.createColumnDefs();
    this.createTeamDetailsColDefs();
    this.createExceptionalTaskColDefs();
    this.createSLABreachColumnDefs();

    this.messageSubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });
    this.getMyTaskDetails();
  }

  getMyTaskDetails() {
    this.httpClient.get('assets/data/modules/network_deployment/gNodeB/task-details.json')
      .subscribe(data => {
        this.rowData = data;
        // this.datatable.typeOfAgGridTable = "Default-Ag-Grid";
        // this.datatable.gridPinnedServices = this.gridPinned;
        // this.datatable.rowDataServices = this.rowData;
        // this.datatable.gridOptionsServices = this.gridOptions;
        // this.datatable.defaultColDefServices = this.defaultColDef;
      });
  }

  onChange(event) {
    console.log(event)
  }

  public createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "",
        width: 50,
        checkboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        headerCheckboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        pinned: 'left',
      },
      {
        headerName: "Status",
        cellRenderer: this.statusFunc,
        field: "status",
        width: 140,
        pinned: "left"
      },
      {
        headerName: "Task Owner",
        field: "taskOwner",
        width: 200,
        pinned: "left"
      },
      {
        headerName: "SAP ID",
        field: "sapId",
        width: 140,
      },
      {
        headerName: "Milestone",
        field: "milestone",
        width: 140,
      },
      {
        headerName: "Task Name",
        field: "taskName",
        width: 150,
      },
      {
        headerName: "Task Assignment Date",
        field: "taskDate",
        width: 140,
      },
      {
        headerName: "SLA Days",
        field: "slaDays",
        width: 120,
      },
      {
        headerName: "Target Complete Date",
        field: "targetCompleteDate",
        width: 130,
      },
      {
        headerName: "Actual Complete Date",
        field: "actualCompleteDate",
        width: 160,
      },
      {
        headerName: "SLA Status",
        field: "slaStatus",
        width: 130,
      },
      {
        headerName: "Proposed Completion Date",
        field: "proposedCompletionDate",
        cellRenderer: this.dateFunc,
        width: 250
      },
      {
        headerName: "Reason",
        field: "reason",
        cellRenderer: 'dropdownRenderer',
        width: 180
      },
      {
        headerName: "Remark",
        field: "remark",
        cellRenderer: 'inputRenderer',
        width: 180
      },
      {
        headerName: "Jio Center",
        field: "jioCenter",
        width: 180
      },
      {
        headerName: "Maintenance Point",
        field: "maintenancePoint",
        width: 180,
        pinned: "right"
      }
    ];
    this.datatable.columnDefsServices = this.columnDefs;
  }

  public createSLABreachColumnDefs() {
    this.columnDefsSLABreach = [
      {
        headerName: "",
        width: 50,
        checkboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        // headerCheckboxSelection: function (params) {
        //   return params.columnApi.getRowGroupColumns().length === 0;
        // },
        pinned: 'left',
      },
      {
        headerName: "Task Owner",
        field: "taskOwner",
        width: 200,
        pinned: "left"
      },
      {
        headerName: "SAP ID",
        field: "sapId",
        width: 140,
      },
      {
        headerName: "Milestone",
        field: "milestone",
        width: 140,
      },
      {
        headerName: "Task Name",
        field: "taskName",
        width: 150,
      },
      {
        headerName: "Task Assignment Date",
        field: "taskDate",
        width: 140,
      },
      {
        headerName: "SLA Days",
        field: "slaDays",
        width: 120,
      },
      {
        headerName: "Target Complete Date",
        field: "targetCompleteDate",
        width: 130,
      },
      {
        headerName: "Actual Complete Date",
        field: "actualCompleteDate",
        width: 160,
      },
      {
        headerName: "SLA Status",
        field: "slaStatus",
        width: 130,
      },
      {
        headerName: "Proposed Completion Date",
        field: "proposedCompletionDate",
        cellRenderer: this.dateFunc,
        width: 250
      },
      {
        headerName: "Reason",
        field: "reason",
        cellRenderer: 'dropdownRenderer',
        width: 180
      },
      {
        headerName: "Remark",
        field: "remark",
        cellRenderer: 'inputRenderer',
        width: 180
      },
      {
        headerName: "Jio Center",
        field: "jioCenter",
        width: 180
      },
      {
        headerName: "Maintenance Point",
        field: "maintenancePoint",
        width: 180,
      },
      {
        headerName: "Task Status",
        field: "taskStatus",
        width: 180,
        pinned: "right"
      }
    ];
    this.datatable.columnDefsServices = this.columnDefsSLABreach;
  }

  public createExceptionalTaskColDefs() {
    this.columnDefsExpTask = [
      {
        headerName: "",
        width: 50,
        checkboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        headerCheckboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        pinned: 'left',
      },
      {
        headerName: "SAP ID",
        field: "sapId",
        width: 140,
      },
      {
        headerName: "Milestone",
        field: "milestone",
        width: 140,
      },
      {
        headerName: "Task Name",
        field: "taskName",
        width: 150,
      },
      {
        headerName: "Task Assignment Date",
        field: "taskDate",
        width: 140,
      },
      {
        headerName: "SLA Days",
        field: "slaDays",
        width: 120,
      },
      {
        headerName: "Target Complete Date",
        field: "targetCompleteDate",
        width: 130,
      },
      {
        headerName: "Actual Complete Date",
        field: "actualCompleteDate",
        width: 160,
      },
      {
        headerName: "SLA Status",
        field: "slaStatus",
        width: 130,
      },
      {
        headerName: "Proposed Completion Date",
        field: "proposedCompletionDate",
        cellRenderer: this.dateFunc,
        width: 250
      },
      {
        headerName: "Reason",
        field: "reason",
        cellRenderer: 'dropdownRenderer',
        width: 180
      },
      {
        headerName: "Remark",
        field: "remark",
        cellRenderer: 'inputRenderer',
        width: 180
      },
      {
        headerName: "Jio Center",
        field: "jioCenter",
        width: 180
      },
      {
        headerName: "Maintenance Point",
        field: "maintenancePoint",
        width: 180,
      },
      {
        headerName: "Task Status",
        field: "taskStatus",
        width: 180,
        pinned: "right",
      },
      {
        headerName: "Task Owner",
        field: "taskOwner",
        width: 200,
        pinned: "right"
      },
    ];
    this.datatable.columnDefsServices = this.columnDefsExpTask;
  }
  public createTeamDetailsColDefs() {
    this.columnDefsTeams = [
      {
        headerName: "Progress",
        cellRenderer: this.statusFunc,
        field: "status",
        width: 140,
        pinned: "left"
      },
      {
        headerName: "Task Owner",
        field: "taskOwner",
        width: 200,
        pinned: "left"
      },
      {
        headerName: "SAP ID",
        field: "sapId",
        width: 140,
      },
      {
        headerName: "Milestone",
        field: "milestone",
        width: 140,
      },
      {
        headerName: "Task Name",
        field: "taskName",
        width: 150,
      },
      {
        headerName: "Task Assignment Date",
        field: "taskDate",
        width: 140,
      },
      {
        headerName: "SLA Days",
        field: "slaDays",
        width: 120,
      },
      {
        headerName: "Target Complete Date",
        field: "targetCompleteDate",
        width: 130,
      },
      {
        headerName: "Actual Complete Date",
        field: "actualCompleteDate",
        width: 160,
      },
      {
        headerName: "SLA Status",
        field: "slaStatus",
        width: 130,
      },
      {
        headerName: "Proposed Completion Date",
        field: "proposedCompletionDate",
        width: 180
      },
      {
        headerName: "Reason",
        field: "reason",
        width: 180
      },
      {
        headerName: "Remark",
        field: "remark",
        cellRenderer: 'inputRenderer',
        width: 180
      },
      {
        headerName: "Jio Center",
        field: "jioCenter",
        width: 180
      },
      {
        headerName: "Maintenance Point",
        field: "maintenancePoint",
        width: 180
      },
      {
        headerName: "Task Status",
        field: "maintenancePoint",
        width: 180,
        pinned: "right"
      }
    ];

  }

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


  dateFunc(params) {
    var status = params.value;
    console.log("status", status);
    return '<input type="date" style="border: transparent; border-bottom: 1px solid gray;width: 100%;height: 32px;" value="' + status + '">';
  }


  public eventsSubject: Subject<any> = new Subject();
  onFilterChanged(evt) {
    this.gridFilterValueServices["filter"] = evt.target.value;
    this.eventsSubject.next(this.gridFilterValueServices);
    this.eventsSubject.subscribe((data) => {
      this.gridOptionsMyTask.api.setQuickFilter(data.filter);
      this.gridOptionsTeamTask.api.setQuickFilter(data.filter);
      this.gridOptionsSLABreach.api.setQuickFilter(data.filter);
      this.gridOptionsExceptional.api.setQuickFilter(data.filter);
    });
  };
  show: any;
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
    params.api.paginationGoToPage(4);
  }

  onPageSizeChanged(newPageSize) {
    this.gridApi.paginationSetPageSize(Number(newPageSize.value));
  }


  ngOnInit(): void {
  }


  tabChanged(event) {
    console.log(event);
    if (event.index === 1) {
      this.createTeamDetailsColDefs();
      this.httpClient.get('assets/data/modules/network_deployment/gNodeB/team-task.json')
        .subscribe(data => {
          this.rowDataTeams = data;
          // this.datatable.typeOfAgGridTable = "Default-Ag-Grid";
          // this.datatable.gridPinnedServices = this.gridPinned;
          // this.datatable.rowDataServices = this.rowData;
          // this.datatable.gridOptionsServices = this.gridOptions;
          // this.datatable.defaultColDefServices = this.defaultColDef;
          // this.datatable.columnDefsServices = this.columnDefsTeams;
        });
    } else {
      this.getMyTaskDetails();
    }

  }

  onCellClicked(event: any) {
    console.log('cell', event);
    if (event.value) {
      this.router.navigate(["/JCP/Modules/Network-Deployment/Plan-To-Build/gNodeB/Task-Details/Sap-Id-Details"]);
    }
  }


  cellClickedDetails(evt) {
    if (evt.value) {
      this.router.navigate(["/JCP/Modules/Network-Deployment/Plan-To-Build/gNodeB/Task-Details/Sap-Id-Details"]);
    }
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

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }


}
