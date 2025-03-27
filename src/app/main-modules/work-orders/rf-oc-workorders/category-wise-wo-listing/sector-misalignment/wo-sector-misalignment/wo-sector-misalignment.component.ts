import { Component, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { COLUMN_DEFS } from './wo-column-defs.constants';
import { MatSidenav } from '@angular/material/sidenav';
import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { FormControl } from '@angular/forms';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { IWoValues, IWo_Sector_grid } from '../../../Irf-oc';

const COLUMNDEFS = COLUMN_DEFS;
@Component({
  selector: 'app-wo-sector-misalignment',
  templateUrl: './wo-sector-misalignment.component.html',
  styleUrls: ['./wo-sector-misalignment.component.scss']
})
export class WoSectorMisalignmentComponent implements OnDestroy {
  url: string = "assets/data/report/sector-misalignment/wo-sector-misalignment.json"
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public sidenavBarStatus: boolean;
  public rowData: Array<IWo_Sector_grid>;
  public columnDefs: Array<{}>;
  public frameworkComponentsWOSectorComponent = {
    statusFlagRenderer: StatusRendererComponent,
  };
  public searchGrid = '';
  public paginationValues: number[] = [10, 20, 30, 40];
  public formControlPageCount = new FormControl();
  public gridFilterValueServices = {};
  public showGlobalOperation: boolean = true;
  woHeader: Array<IWoValues> = [
    {
      id: 1,
      "label": "Category",
      "value": "Sector Misalignment"
    },
    {
      id: 2,
      "label": "SAP ID",
      "value": "I-MU-MUMB-0306"
    },
    {
      id: 3,
      "label": "Template",
      "value": "Sector Misalignment"
    },
    {
      id: 4,
      "label": "Work Order Creation Date",
      "value": "24 Sep, 2019"
    },
    {
      id: 5,
      "label": "Work Order Status",
      "value": "In Progress"
    }
  ];
  showFullScreen: boolean = false;
  public destroySubscription: Subscription = new Subscription();
  trackHero(index, woHeader) {
    return woHeader ? woHeader.id : undefined;
  }

  constructor(private datashare: DataSharingService, private router: Router, private httpClient: HttpClient) {
    router.events.subscribe();
    this.destroySubscription = this.datashare.currentMessage.subscribe((message: boolean) => {
      this.sidenavBarStatus = message;
    });

    //API call to get WO Service details
    this.httpClient.get(this.url)
      .subscribe((data: Array<IWo_Sector_grid>) => {
        this.rowData = data;
        this.columnDefs = COLUMNDEFS;
      });
  }

  public eventsSubject: Subject<any> = new Subject();
  onFilterChanged(evt) {
    this.gridFilterValueServices["filter"] = evt.target.value;
    this.eventsSubject.next(this.gridFilterValueServices);
  };

  show: boolean;
  toggleSearch() {
    this.show = !this.show;
  };

  cellClickedDetails(evt) {
    if (evt.value) {
      this.router.navigate(["/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Sector-Misalignment/WO-Sector-Misalignment/Execution-Task"]);
    }
  }

  goBack() {
    this.router.navigate(['/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Sector-Misalignment'])
  }

  ngOnDestroy() {
    this.destroySubscription.unsubscribe();
  }
}
