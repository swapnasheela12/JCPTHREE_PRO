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

  url: string = "assets/data/report/sector-misalignment/wo-sector-misalignment.json"
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public sidenavBarStatus;
  public rowData: any;
  public columnDefs: any[];
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

  constructor(private datashare: DataSharingService, private router: Router, private httpClient: HttpClient) {
    router.events.subscribe();
    this.destroySubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });

    //API call to get WO Service details
    this.httpClient.get(this.url)
      .subscribe(data => {
        this.rowData = data;
        this.columnDefs = COLUMN_DEFS;
      });

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

