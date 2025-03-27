import { Component, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSidenav } from '@angular/material/sidenav';
import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { COLUMN_DEFS } from '../../sector-misalignment/wo-sector-misalignment/wo-column-defs.constants';
import { FormControl } from '@angular/forms';

const COLUMNDEFS = COLUMN_DEFS;
@Component({
  selector: 'app-wo-decongestion',
  templateUrl: './wo-decongestion.component.html',
  styleUrls: ['./wo-decongestion.component.scss']
})
export class WoDecongestionComponent implements OnDestroy {

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
        this.columnDefs = COLUMNDEFS;
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
      this.router.navigate(["/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Cell-Decongestion/WO-Cell-Decongestion/Execution-Task", { title: evt.data.name, skipLocationChange: true }]);
    }
  }

  goBack() {
    this.router.navigate(['/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Sector-Misalignment'])
  }

  ngOnDestroy() {
    this.destroySubscription.unsubscribe();
  }
}

