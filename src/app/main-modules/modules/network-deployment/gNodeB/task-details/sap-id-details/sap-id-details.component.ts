import { Component, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSidenav } from '@angular/material/sidenav';
import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { FormControl } from '@angular/forms';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import { RejectTaskComponent } from './reject-task/reject-task.component';
import { SuccessfulModalComponent } from 'src/app/core/components/commonPopup/successful-modal/successful-modal.component';
import { ILabelValue } from 'src/app/main-modules/work-orders/rf-oc-workorders/Irf-oc';

@Component({
  selector: 'app-sap-id-details',
  templateUrl: './sap-id-details.component.html',
  styleUrls: ['./sap-id-details.component.scss']
})
export class SapIdDetailsComponent implements OnDestroy {
  url: string = "assets/data/report/sector-misalignment/wo-sector-misalignment.json"
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public sidenavBarStatus: boolean;
  public columnDefs: Array<{}>;
  public frameworkComponentsWOSectorComponent = {
    statusFlagRenderer: StatusRendererComponent,
  };
  public searchGrid = '';
  public paginationValues: number[] = [10, 20, 30, 40];
  public formControlPageCount = new FormControl();
  public gridFilterValueServices = {};
  public showGlobalOperation: boolean = true;
  woHeader: Array<any> = [
    {
      id: 1,
      "label": "R4G State",
      "value": "Mumbai"
    },
    {
      id: 2,
      "label": "JIO Center ID",
      "value": "MU-NVMB-JC24-0024"
    },
    {
      id: 3,
      "label": "Site Address",
      //"value": "TC-23 RELIANCE CORPORATE PARK PHASE IV A- WING GATE NO A GHANSOLI 400701"
      "value": "TC-23 RELIANCE CORPORATE PARK PHASE"
    },
    {
      id: 4,
      "label": "Milestone",
      "value": "ATP 11A & WCC1"
    },
    {
      id: 5,
      "label": "Task Name",
      "value": "Cisco Router Integration & Configuration"
    }
  ];
  showFullScreen: boolean = false;
  public destroySubscription: Subscription = new Subscription();
  trackHero(index, woHeader) {
    return woHeader ? woHeader.id : undefined;
  }

  interests = [
    { value: 'reading', viewValue: 'Reading' },
    { value: 'swimming', viewValue: 'Swimming' },
    { value: 'cycling', viewValue: 'Cycling' }
  ];

  siteDetails: Array<ILabelValue> = [
    {
      "label": "Circle Name *",
      "value": "I-AS-PTRK-ENB-H004"
    },
    {
      "label": "Site ID *",
      "value": "1"
    },
    {
      "label": "Site Name *",
      "value": "2300"
    }
  ];
  priority = ["P1", "P2"]
  dateOfSurvey = ["10 Oct 2020", "10 Oct 2020"]
  option = ["Yes", "No"]
  poleHeight = ["60", "35"]
  noOfFloor = ["16", "15"];
  proposedHeight = ["10", "10"]
  nearByFiveSites = ["Lorem Ipsum 1, Lorem Ipsum 2, Lorem Ipsum 3, Lorem Ipsum 4, Lorem Ipsum 5", "Lorem Ipsum 1, Lorem Ipsum 2, Lorem Ipsum 3, Lorem Ipsum 4, Lorem Ipsum 5"];
  mountRequired = ["Lorem Ipsum is simply dummy text", "Lorem Ipsum is simply dummy text"]


  constructor(public dialog: MatDialog, private datashare: DataSharingService, private router: Router, private httpClient: HttpClient) {
    router.events.subscribe();
    this.destroySubscription = this.datashare.currentMessage.subscribe((message: boolean) => {
      this.sidenavBarStatus = message;
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

  assignTask() {
    this.dialog.open(RejectTaskComponent, {
      width: "470px",
      height: "305px",
      panelClass: "material-dialog-container"
    });
  }
  openSuccessPopup() { }

  autoAssign() {
    const message = {
      message: `Task Completed successfully.`,
      showMyTasks: true
    }
    this.dialog.open(SuccessfulModalComponent, {
      data: message,
    });
  }

  cellClickedDetails(evt) {
    if (evt.value) {
      this.router.navigate(["/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Sector-Misalignment/WO-Sector-Misalignment/Execution-Task"]);
    }
  }

  goBack() {
    this.router.navigate(['JCP/Modules/Network-Deployment/Plan-To-Build/gNodeB/Task-Details'])
  }

  ngOnDestroy() {
    this.destroySubscription.unsubscribe();
  }
}

