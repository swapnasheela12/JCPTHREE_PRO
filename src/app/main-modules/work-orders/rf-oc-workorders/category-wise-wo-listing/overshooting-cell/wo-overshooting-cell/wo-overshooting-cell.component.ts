import { Component, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { COLUMN_DEFS } from './overshooting-column-defs-constants';
import { MatSidenav } from '@angular/material/sidenav';
import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { FormControl } from '@angular/forms';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
const COLUMNDEFS = COLUMN_DEFS;

@Component({
  selector: 'app-wo-overshooting-cell',
  templateUrl: './wo-overshooting-cell.component.html',
  styleUrls: ['./wo-overshooting-cell.component.scss']
})
export class WoOvershootingCellComponent implements OnDestroy {
  url: string = "assets/data/layers/workorders/wo-overshooting-cell-data.json"
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  public gridFilterValueServices = {};
  public sidenavBarStatus;
  public rowData: Array<{}>;
  public columnDefs: Array<{}>;
  public frameworkComponentsWOSectorComponent = {
    statusFlagRenderer: StatusRendererComponent,
  };
  public paginationValues: number[] = [10, 20, 30, 40];
  public formControlPageCount = new FormControl();

  public showGlobalOperation: Boolean = false;
  destroySubscription: Subscription = new Subscription();
  searchGrid = '';
  woHeader = [
    {
      "label": "Category",
      "value": "Overshooting-cell"
    },
    {
      "label": "SAP ID",
      "value": "I-MU-MUMB-0306"
    },
    {
      "label": "Template",
      "value": "Overshooting Cell"
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
  constructor(private datashare: DataSharingService, private router: Router, private httpClient: HttpClient) {
    router.events.subscribe();
    this.destroySubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });

    //API call to get WO Service details
    this.httpClient.get(this.url)
      .subscribe((data: Array<{}>) => {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }
  cellClickedDetails(params) {
    if (params.data.task === "RFOC L2") {
      this.router.navigate(["/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Overshooting-Cell//RFOC-L2"]);
    } else if (params.data.task === "IAN Lead") {
      this.router.navigate(["/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Overshooting-Cell/IAN-Lead"]);
    }
  }

  goBack() {
    this.router.navigate(['/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Overshooting-Cell'])
  }

  ngOnDestroy() {
    this.destroySubscription.unsubscribe();
  }

}








