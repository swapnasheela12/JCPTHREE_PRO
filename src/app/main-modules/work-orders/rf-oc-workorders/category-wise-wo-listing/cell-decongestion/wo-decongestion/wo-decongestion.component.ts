import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSidenav } from '@angular/material/sidenav';
import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { viewHistoryRendererComponent } from 'src/app/core/components/ag-grid-renders/view-history-renderer.component';
import { FormControl } from '@angular/forms';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { dropDownThreeDotRendererComponent } from 'src/app/core/components/ag-grid-renders/dropDownThreeDot-renderer.component';
import { Subject } from 'rxjs';
import { COLUMN_DEFS } from '../../sector-misalignment/wo-sector-misalignment/wo-column-defs.constants';

const COLUMNDEFS = COLUMN_DEFS;

@Component({
  selector: 'app-wo-decongestion',
  templateUrl: './wo-decongestion.component.html',
  styleUrls: ['./wo-decongestion.component.scss']
})
export class WoDecongestionComponent {

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
  // onReadyModeUpdate(params) {
  //   this.calculateRowCount();
  // }

  // public onReady(params) {
  //   this.gridApi = params.api;
  //   this.calculateRowCount();
  // }
  // public calculateRowCount() {
  //   if (this.gridOptions.api && this.rowData) {
  //     setTimeout(() => {
  //       this.gridOptions.api.sizeColumnsToFit();
  //     }, 1000);
  //   }
  // }

  constructor(private datatable: TableAgGridService, private datashare: DataSharingService,
    private router: Router, private route: ActivatedRoute, private overlayContainer: OverlayContainer,
    private httpClient: HttpClient) {

    // this.gridOptions = <GridOptions>{};
    router.events.subscribe((url: any) => console.log(url));
    this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;

      // if (!message) {
      //   console.log("message", message);
      //   //this.calculateRowCount();
      //   this.showFullScreen = false;
      // }
      // this.getMyStyles()
    });

    //API call to get WO Service details

    this.httpClient.get(this.url)
      .subscribe(data => {
        this.rowData = data;
        this.columnDefs = COLUMNDEFS;
        console.log("this.url", data);
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
    if (evt.value) {
      this.router.navigate(["/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Cell-Decongestion/WO-Cell-Decongestion/Execution-Task"]);
    }
  }

  getMyStyles() {
    let myStyles = {}
    if (this.showFullScreen) {
      myStyles = {
        'width': '20%'
      };
    } else {
      myStyles = {
        'width': '25%'
      };
    }
    return myStyles;
  }


  goBack() {
    this.router.navigate(['/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Sector-Misalignment'])
  }


}

