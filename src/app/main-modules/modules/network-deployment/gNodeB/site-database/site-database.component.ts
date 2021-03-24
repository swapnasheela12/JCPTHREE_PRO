import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionChangedEvent } from 'ag-grid-community';
import { Subject, Subscription } from 'rxjs';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { COLUMN_DEFS } from 'src/app/main-modules/work-orders/rf-oc-workorders/category-wise-wo-listing/sector-misalignment/wo-sector-misalignment/wo-column-defs.constants';
import { IDecongestionGrid } from 'src/app/main-modules/work-orders/rf-oc-workorders/Irf-oc';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { StatusRendererComponent } from '../../../performance-management/kpi-editor/renderer/status-renderer.component';

@Component({
  selector: 'app-site-database',
  templateUrl: './site-database.component.html',
  styleUrls: ['./site-database.component.scss']
})
export class SiteDatabaseComponent {
  public taskDetails = [
    {
      "taskStatusImg": "ic ic-Tejected-Task1",
      "taskCount": "78203",
      "taskAssigned": "Scope"
    },
    {
      "taskStatusImg": "ic ic-Planned",
      "taskCount": "4356",
      "taskAssigned": "Planned"
    },
    {
      "taskStatusImg": "ic ic-On-Air",
      "taskCount": "24567",
      "taskAssigned": "On-Air"
    }
  ]

  url: string = "assets/data/modules/network_deployment/gNodeB/site-database/site-database.json"
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public sidenavBarStatus;
  public rowData: any;
  public columnDefs: any[];
  public defaultColDef = { resizable: true };
  public frameworkComponentsWOSectorComponent = {
    statusFlagRenderer: StatusRendererComponent,
  };
  public searchGrid = '';
  public show;
  public paginationValues: number[] = [10, 20, 30, 40];
  public formControlPageCount = new FormControl();
  public gridFilterValueServices = {};
  public showGlobalOperation: boolean = true;
  public destroySubscription: Subscription = new Subscription();
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
      "label": "Work Order Status",
      "value": "In Progress"
    }
  ];
  showFullScreen: boolean = false;

  constructor(private datatable: TableAgGridService, private datashare: DataSharingService, private router: Router, private httpClient: HttpClient) {
    router.events.subscribe();
    this.destroySubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });
    this.createColumnDefs();

    //API call to get WO Service details
    this.httpClient.get(this.url)
      .subscribe(data => {
        this.rowData = data;
        this.datatable.rowDataURLServices = this.url;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid";
        this.datatable.rowDataServices = this.rowData;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });


  }

  createColumnDefs() {
    this.columnDefs = [
      {
        headerName: 'SAP ID',
        field: 'sapid',
        width: 220,
        pinned: "left"
      },
      {
        headerName: 'Site Status',
        field: 'siteStatus',
        width: 160
      },
      {
        headerName: 'Site Category',
        field: 'siteCategory',
        width: 160
      },
      {
        headerName: 'Site Type',
        field: 'siteType',
        width: 150
      },
      {
        headerName: 'Backhaul',
        field: 'backhaul',
        width: 150
      },
      {
        headerName: 'Current Milestone',
        field: 'currentMilestone',
        width: 180
      },
      {
        headerName: 'Current Task',
        field: 'currentTask',
        width: 180,
        pinned: 'right'
      }
    ]
    this.datatable.columnDefsServices = this.columnDefs;
  }


  public eventsSubject: Subject<any> = new Subject();
  onFilterChanged(evt) {
    this.gridFilterValueServices["filter"] = evt.target.value;
    this.eventsSubject.next(this.gridFilterValueServices);
  };
  show: any;
  toggleSearch() {
    this.show = !this.show;
  };

  showTaskData(evt) {
    console.log(evt)
  }


  cellClickedDetails(evt) {
    console.log("proposedIndoorColDef", evt)
    if (evt.value) {
      this.router.navigate(["JCP/Modules/Network-Deployment/Plan-To-Build/gNodeB/Site-Database/Site-Id-Details"]);
    }
  }

  goBack() {
    this.router.navigate(['/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Sector-Misalignment'])
  }

  ngOnDestroy() {
    this.destroySubscription.unsubscribe();
  }
}

