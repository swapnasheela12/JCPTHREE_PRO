import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { ViewChild, Input, TemplateRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GridOptions, GridCore, SelectionChangedEvent } from 'ag-grid-community';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { GridApi } from '@ag-grid-community/core';
import { WoFilterComponent } from '../web-performance-test/wo-filter/wo-filter.component';
declare var $: any;

@Component({
  selector: 'app-regulatory',
  templateUrl: './regulatory.component.html',
  styleUrls: ['./regulatory.component.scss']
})
export class RegulatoryComponent implements OnInit {
  @Input() commonTableAggrid: TemplateRef<any>;
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public gridOptionsPending: GridOptions;
  public gridOptionsHistory: GridOptions;
  public rowData: any;
  public rowDataPending: any;
  public rowDataHistory: any;
  public columnDefs;
  public rowCount: string;
  public defaultColDef = { resizable: true };
  public sidenavBarStatus;
  public tableWidth;
  public gridPinned = false;
  public messageSubscription: Subscription;
  public gridFilterValueServices = {};
  private paginationPageSize = 10;
  public searchGrid = '';

  templateType = ["Target Area", "Target Area"]

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

  //daterange
  selectDaily = ["Daily", "Weekly", "Monthly"];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  thirdFormGroup: FormGroup;
  selected: {
    startDate: '2019-12-11T18:30:00.000Z',
    endDate: '2019-12-12T18:29:59.000Z',
  }

   ///////datepicker//////////
   opens = 'center';
   drops = 'up';
   public todaysDay = new Date();
   selectedDateTime: any;
   selectedDateTimeValue: boolean = false;
   invalidDates: moment.Moment[] = [];
   tooltips = [
     { date: moment(), text: 'Today is just unselectable' },
     { date: moment().add(2, 'days'), text: 'Yeeeees!!!' },
   ];
   ranges = {
     Today: [moment(), moment()],
     Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
     'Last 7 Days': [moment().subtract(6, 'days'), moment()],
     'Last 30 Days': [moment().subtract(29, 'days'), moment()],
     'This Month': [moment().startOf('month'), moment().endOf('month')],
     'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
     'Last 3 Month': [moment().subtract(3, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
   };

   columnDefsHistory;
   columnDefsPending;

  constructor(private fb: FormBuilder, public dialog: MatDialog, private datatable: TableAgGridService, private datashare: DataSharingService, private router: Router,
    private overlayContainer: OverlayContainer, private httpClient: HttpClient) {
      this.stepperReportW();
    this.gridOptions = <GridOptions>{};
    this.gridOptionsPending = <GridOptions>{};
    this.gridOptionsHistory = <GridOptions>{};
    this.createColumnDefs();

    this.messageSubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });
    this.getMyTaskDetails();
  }

  getMyTaskDetails() {
    this.httpClient.get('assets/data/workorder/nv-workorder/regulatory/wo-regulatory.json')
      .subscribe(data => {
        this.rowData = data;
        this.rowDataPending = data;
        this.rowDataHistory = data;
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
        width: 170,
        pinned: 'left'
      },
      {
        headerName: "Workorder",
        field: "workorder",
        width: 230
      },
      {
        headerName: "Assigned By",
        field: "assignedBy",
        width: 190,
      },
      {
        headerName: "Assigned To",
        field: "assignedTo",
        width: 160,
      },
      {
        headerName: "Due Date",
        field: "dueDate",
        width: 180
      },
      {
        headerName: "Last Updated",
        field: "lastUpdated",
        width: 220,
        cellRenderer: function (params) {
          let template = '<div>'+
          '<div style="line-height: 30px">'+params.data.lastUpdated+'</div>'+
          '<div style="line-height: 2px;">'+params.data.lastCompletedTime+'</div>'+
          '</div>';
          return template;
        }
      },
      {
        headerName: "Task Completion",
        field: 'taskCompletion',
        cellRenderer: this.taskCompletionFunc,
        width: 200,
        pinned: "right"
      }
    ];
    this.columnDefsPending = [
      {
        headerName: "Status",
        cellRenderer: this.statusFunc,
        field: "status",
        width: 170,
        pinned: 'left'
      },
      {
        headerName: "Workorder",
        field: "workorder",
        width: 230
      },
      {
        headerName: "Assigned By",
        field: "assignedBy",
        width: 190,
      },
      {
        headerName: "Assigned To",
        field: "assignedTo",
        width: 160,
      },
      {
        headerName: "Due Date",
        field: "dueDate",
        width: 180
      },
      {
        headerName: "Last Updated",
        field: "lastUpdated",
        width: 220,
        cellRenderer: function (params) {
          let template = '<div>'+
          '<div style="line-height: 30px">'+params.data.lastUpdated+'</div>'+
          '<div style="line-height: 2px;">'+params.data.lastCompletedTime+'</div>'+
          '</div>';
          return template;
        }
      },
      {
        headerName: "Task Completion",
        field: 'taskCompletion',
        cellRenderer: this.taskCompletionFunc,
        width: 200,
        pinned: "right"
      }
    ];
    this.columnDefsHistory = [
      {
        headerName: "Status",
        cellRenderer: this.statusFunc,
        field: "status",
        width: 170,
        pinned: 'left'
      },
      {
        headerName: "Workorder",
        field: "workorder",
        width: 230
      },
      {
        headerName: "Assigned By",
        field: "assignedBy",
        width: 190,
      },
      {
        headerName: "Assigned To",
        field: "assignedTo",
        width: 160,
      },
      {
        headerName: "Due Date",
        field: "dueDate",
        width: 180
      },
      {
        headerName: "Last Updated",
        field: "lastUpdated",
        width: 220,
        cellRenderer: function (params) {
          let template = '<div>'+
          '<div style="line-height: 30px">'+params.data.lastUpdated+'</div>'+
          '<div style="line-height: 2px;">'+params.data.lastCompletedTime+'</div>'+
          '</div>';
          return template;
        }
      },
      {
        headerName: "Task Completion",
        field: 'taskCompletion',
        cellRenderer: this.taskCompletionFunc,
        width: 200,
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

  taskCompletionFunc(params) {
     var status = params.data.taskCompleted;
     var width = parseInt(status);
    var barColor = '';
    var barColor = '';
    if (status == 100) {
      barColor = '#60DD5C';
    } else if (status = 0  &&  status <= 49 ) {
      barColor = '#F8C93A';
    } else if (status = 50 && status <= 99) {
      barColor = '#F8C93A';
    }  else {
      barColor = '#F8C93A';
    }
    return '<div class="jcp-two-lines-progress col-12" style="width: 120px; height: 50%">' +
                '<div class="values" style="font-family:Lato Regular; font-size: 12px;height: 14px;">' + params.data.taskCompleted + "%" +'</div>' +
                    '<div class="progress" style="display: inline-flex; width: 109px">' +
                        '<div class="progress-bar " style=" background-color: ' +
                        barColor +
                        '; width:' + width + "%" + ';">'+'</div>'+
                  '</div>' + 
                '</div>';
  }


  dateFunc(params) {
    var status = params.value;
    return '<input type="date" style="border: transparent; border-bottom: 1px solid gray;width: 100%;height: 32px;" value="' + status + '">';
  }

  
  public eventsSubject: Subject<any> = new Subject();
  onFilterChanged(evt) {
    this.gridFilterValueServices["filter"] = evt.target.value;
    this.eventsSubject.next(this.gridFilterValueServices);
    this.eventsSubject.subscribe((data) => {
      this.gridOptions.api.setQuickFilter(data.filter);
      this.gridOptionsPending.api.setQuickFilter(data.filter);
      this.gridOptionsHistory.api.setQuickFilter(data.filter);
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

  // onGridSizeChanged(event) {
  //   if (this.gridOptions.api && this.rowData) {
  //     this.gridOptions.api.sizeColumnsToFit();
  //   }
  //   if (this.gridOptionsPending.api && this.rowDataPending) {
  //     this.gridOptionsPending.api.sizeColumnsToFit();
  //   }
  //   if (this.gridOptionsHistory.api && this.rowDataHistory) {
  //     this.gridOptionsHistory.api.sizeColumnsToFit();
  //   }
  // }

  onRowClicked(event) {
    this.router.navigate(['/JCP/Work-Orders/NV-Workorders/Regulatory-Reporting/WO-Regulatory'])
  }


  showTaskData(evt) {}

  selectionChanged(event: SelectionChangedEvent) {
    let lengthOfSelectedRow = event.api.getSelectedRows().length;
    if (1 < lengthOfSelectedRow) {
    }
  }

  get PaginationPageSize(): number {
    return this.paginationPageSize;
  }

  get gridAPI(): GridApi {
    return this.gridApi;
  }

  onPageSizeChanged(newPageSize) {
    this.gridApi.paginationSetPageSize(Number(newPageSize.value));
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.paginationGoToPage(4);    
  }

  ngOnInit(): void {
  }


  tabChanged(event) {
    //
  }

  onCellClicked(event: any) {
    if (event.value) {
      this.datashare.changeMessage({ status: event.data.status })
      this.router.navigate(["/JCP/Modules/Network-Deployment/Plan-To-Build/gNodeB/Task-Details/Sap-Id-Details"]);
    }
  }

  stepperReportW() {
    this.thirdFormGroup = this.fb.group({
      selectedDateTime: {
        startDate: moment().subtract(1, 'days').set({ hours: 0, minutes: 0 }),
        endDate: moment().subtract(1, 'days').set({ hours: 23, minutes: 59 }),
      },
      alwaysShowCalendars: true,
      keepCalendarOpeningWithRange: true,
      showRangeLabelOnInput: true,
    });
  }


  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some((d) => d.isSame(m, 'day'));
  };

  isTooltipDate = (m: moment.Moment) => {
    const tooltip = this.tooltips.find((tt) => tt.date.isSame(m, 'day'));
    if (tooltip) {
      return tooltip.text;
    } else {
      return false;
    }
  };

  rangeClicked(range): void {
    this.selectedDateTimeValue = true;
  }

  datesUpdated(range): void {
    this.selectedDateTimeValue = true;
  }

  openWOFilter() {
    this.dialog.open(WoFilterComponent,{
      width: "25vw",
      height: "43vh",
      panelClass: 'wo-filter'
    });
  }

                                      
  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }


}


