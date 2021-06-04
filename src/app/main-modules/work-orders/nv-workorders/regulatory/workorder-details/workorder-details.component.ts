import { takeUntil } from 'rxjs/operators';
import { executionStatus, executionStatusDropdown } from '../../../../../core/components/common-elements/type-dropdown-modulelist';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSelect } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
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
import { GridOptions, GridCore } from 'ag-grid-community';
import * as _ from 'lodash';
import { DIRECTION_LIST, TYPE_LIST, DSCP_LIST } from 'src/app/main-modules/reports-dashboards/custom-dashboard/twamp-live-dashboard/twamp-live-dashboard.constant';
import { DeleteRendererComponent } from 'src/app/core/components/ag-grid-renders/delete-renderer.component';
import { GridApi } from '@ag-grid-community/core';
import { ThreeDotDeleteRegulatoryRenderer } from '../renderer/threedot-delete-regulatory-renderer';

declare var $: any;

@Component({
  selector: 'app-workorder-details',
  templateUrl: './workorder-details.component.html',
  styleUrls: ['./workorder-details.component.scss']
})
export class WorkorderDetailsComponent implements OnInit {
  public workorders: any = {};
  @Input() commonTableAggrid: TemplateRef<any>;
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////
  public sidenavBarStatus;
  public tableWidth;
  public gridApi;

  public gridColumnApi;
  public gridPinned = false;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: any;
  public columnDefs: any[];
  public rowCount: string;
  public messageSubscription: Subscription;
  public gridFilterValueServices = {};
  public defaultColDef = { resizable: true };
  public frameworkComponentsWO = {
    deleteRenderer: ThreeDotDeleteRegulatoryRenderer
  };
  public rowSelection;
  paginationPageSize = 10;

  constructor(private location: Location, private _formBuilder: FormBuilder, private datatable: TableAgGridService, private datashare: DataSharingService, private router: Router, private overlayContainer: OverlayContainer, private httpClient: HttpClient) {
    this.router.events.subscribe((val) => {
    });
    this.gridOptions = <GridOptions>{};
    this.rowSelection = 'multiple';
    this.createColumnDefs();

    this.messageSubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });

    this.httpClient.get('assets/data/workorder/nv-workorder/regulatory/wo-details-regulatory.json')
      .subscribe(data => {
        this.rowData = data;
      });

  }

  onChange(event) {
    console.log(event)
  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "Status",
        cellRenderer: this.statusFunc,
        field: "status",
        width: 250,
        pinned: 'left'
      },
      {
        headerName: "Task",
        field: "task",
        width: 250,
      },
      {
        headerName: "Assigned By",
        field: "assignedBy",
        width: 250,
      },
      {
        headerName: "Assigned To",
        field: "assignedTo",
        width: 250,
        cellRenderer: function (params) {
          console.log(params,"params");
          let template = '<div>'+
          '<div style="line-height: 30px">'+params.data.assignedTo+'</div>'+
          '<div style="line-height: 2px;">'+params.data.assignedToDate+'</div>'+
          '</div>';
          return template;
          // return moment(params.data.creationTime).format('DD MMM, YYYY');
        }
      },
      {
        headerName: "Due Date",
        field: "dueDate",
        width: 170
      },
      {
        headerName: "Last Completed Date",
        field: "lastCompletedDate",
        width: 180
      },
      {
        headerName: "Task Completion",
        field: 'taskCompletion',
        cellRenderer: this.taskCompletionFunc,
        width: 180
      },
      {
        headerName: "",
        cellRenderer: 'deleteRenderer',
        width: 100,
        pinned: 'right'
      }
    ];
    this.datatable.columnDefsServices = this.columnDefs;
  }

  taskCompletionFunc(params) {
    var status = params.data.taskCompleted;
    var width = parseInt(status);
    console.log("width", width)
    var barColor = '';
    var barColor = '';
    if (status == 100) {
      barColor = '#60DD5C';
    } else if (status = 0 && status <= 49) {
      barColor = '#F8C93A';
    } else if (status = 50 && status <= 99) {
      barColor = '#F8C93A';
    } else {
      barColor = '#F8C93A';
    }
    return '<div class="jcp-two-lines-progress col-12" style="width: 120px; height: 50%">' +
      '<div class="values" style="font-family:Lato Regular; font-size: 12px;height: 14px;">' + params.data.taskCompleted + "%" + '</div>' +
      '<div class="progress" style="display: inline-flex; width: 109px">' +
      '<div class="progress-bar " style=" background-color: ' +
      barColor +
      '; width:' + width + "%" + ';">' + '</div>' +
      '</div>' +
      '</div>';
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


  searchGrid = '';
  public eventsSubject: Subject<any> = new Subject();
  onFilterChanged(evt) {
    console.log(evt, "evt");
    this.gridFilterValueServices["filter"] = evt;
    this.eventsSubject.next(this.gridFilterValueServices);

  };

  showInputField: boolean;
  toggleSearch() {
    this.showInputField = !this.showInputField;
  };


  ngOnInit(): void {
  }


  beforeOpen() {
    this.overlayContainer.getContainerElement().classList.add('select-overlay');
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


  onGridSizeChanged(params) {
    if (this.gridOptions.api && this.rowData) {
      this.gridOptions.api.sizeColumnsToFit();
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.paginationGoToPage(4);  
  }


  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  backPageRout() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
