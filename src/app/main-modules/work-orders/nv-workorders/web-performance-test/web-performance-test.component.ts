import { OverlayContainer } from '@angular/cdk/overlay';
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
import { MatDialog } from '@angular/material/dialog';
import { DropDownRendererComponent } from 'src/app/main-modules/modules/network-deployment/gNodeB/task-details/dropDown-renderer.component';
declare var $: any;

@Component({
  selector: 'app-web-performance-test',
  templateUrl: './web-performance-test.component.html',
  styleUrls: ['./web-performance-test.component.scss']
})
export class WebPerformanceTestComponent implements OnInit {
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
    dropdownRenderer: dropDownThreeDotRendererComponent,
    inputRenderer: inputRendererComponent,
  };
  public searchGrid = '';

  public taskDetails = [
    {
      "taskStatusImg": "ic ic-Total-Task",
      "taskCount": "78203",
      "taskType": "All",
      "taskAssigned": "Total Task",
      "riskCount": "",
      "riskStatus": ""
    },
    {
      "taskStatusImg": "ic ic-New-Task",
      "taskCount": "4356",
      "taskType": "Not Started",
      "taskAssigned": "Not At Risk",
      "riskCount": "1",
      "riskStatus": "At Risk"
    },
    {
      "taskStatusImg": "ic ic-In-Progress-Task",
      "taskCount": "24567",
      "taskType": "In Progress",
      "taskAssigned": "Not At Risk",
      "riskCount": "3",
      "riskStatus": "At Risk"
    }, {
      "taskStatusImg": "ic ic-Completed-Task",
      "taskCount": "36678",
      "taskType": "Completed",
      "taskAssigned": "11 June - 23 Dec",
      "riskCount": "",
      "riskStatus": ""
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
    // this.createTeamDetailsColDefs();
    // this.createExceptionalTaskColDefs();
    // this.createSLABreachColumnDefs();

    this.messageSubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });
    this.getMyTaskDetails();
  }

  getMyTaskDetails() {
    this.httpClient.get('assets/data/workorder/nv-workorder/nv-wpf.json')
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
        headerName: "Status",
        cellRenderer: this.statusFunc,
        field: "status",
        width: 140
      },
      {
        headerName: "Workorder",
        field: "workorder",
        width: 290
      },
      {
        headerName: "Assigned By",
        field: "assignedBy",
        width: 250,
      },
      {
        headerName: "Assigned To",
        field: "assignedTo",
        width: 150,
      },
      {
        headerName: "Due Date",
        field: "dueDate",
        width: 180
      },
      {
        headerName: "",
        cellRenderer: 'dropdownRenderer',
        width: 90,
        pinned: 'right'
      }
    ];
    this.datatable.columnDefsServices = this.columnDefs;
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

  showTaskData(evt) {

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
    //
  }

  onCellClicked(event: any) {
    console.log('cell', event);
    if (event.value) {
      this.datashare.changeMessage({ status: event.data.status })
      this.router.navigate(["/JCP/Modules/Network-Deployment/Plan-To-Build/gNodeB/Task-Details/Sap-Id-Details"]);
    }
  }


  // cellClickedDetails(evt) {
  //   if (evt.value) {
  //     this.router.navigate(["/JCP/Modules/Network-Deployment/Plan-To-Build/gNodeB/Task-Details/Sap-Id-Details"]);
  //   }
  // }
                                      
  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }


}

