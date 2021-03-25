import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectionChangedEvent } from 'ag-grid-community';
import { Subject, Subscription } from 'rxjs';
import { SuccessfulModalComponent } from 'src/app/core/components/commonPopup/successful-modal/successful-modal.component';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { RejectTaskComponent } from '../../task-details/reject-task/reject-task.component';
import { DocumentRendererComponent } from '../renderer/document-renderer.component';
import { ImageViewerRendererComponent } from '../renderer/image-viewer-renderer.component';
import { RfiSurveyFormRendererComponent } from '../renderer/rfi-survey-form-renderer.component';
import { RfiSurveyFormComponent } from '../rfi-survey-form/rfi-survey-form.component';

@Component({
  selector: 'app-site-id-detail',
  templateUrl: './site-id-detail.component.html',
  styleUrls: ['./site-id-detail.component.scss']
})
export class SiteIdDetailComponent implements OnDestroy {
  url: string = "assets/data/report/sector-misalignment/wo-sector-misalignment.json"
  // @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: any;
  public columnDefs: any[];
  public digitalFormColDefs: any[];
  public frameworkComponentsTaskDetails = {
    statusFlagRenderer: StatusRendererComponent,
    imageRenderer: ImageViewerRendererComponent,
    documentRenderer: DocumentRendererComponent,
    digitalFormRenderer: RfiSurveyFormRendererComponent
  };
  public searchGrid = '';
  public paginationValues: number[] = [10, 20, 30, 40];
  public formControlPageCount = new FormControl();
  public gridFilterValueServices = {};
  public showGlobalOperation: boolean = true;
  public messageSubscription: Subscription;
  public sidenavBarStatus;
  public defaultColDef = { resizable: true };
  public tableWidth;
  public gridPinned = false;


  panelOpenState = false;


  sitesimages = [{
    imageurl: "assets/images/Layers/sites-expand/sitesexpand2.jpg"
  }, {
    imageurl: "assets/images/Layers/sites-expand/sitesexpand3.jpg"
  }, {
    imageurl: "assets/images/Layers/sites-expand/sitesexpand4.jpg"
  }, {
    imageurl: "assets/images/Layers/sites-expand/sitesexpand6.jpg"
  }, {
    imageurl: "assets/images/Layers/sites-expand/sitesexpand7.jpg"
  }, {
    imageurl: "assets/images/Layers/sites-expand/sitesexpand8.jpg"
  }
  ];

  downloads = [
    {
      docType: "RFA - RAC",
      docStatus: "Released for Acquisition"
    },
    {
      docType: "RFA - RAC",
      docStatus: "Released for Acquisition"
    },
    {
      docType: "RFA - RAC",
      docStatus: "Released for Acquisition"
    },
    {
      docType: "RFA - RAC",
      docStatus: "Released for Acquisition"
    }
  ]

  digitalForms = [
    {
      status: "New",
      mileStone: "RFA - RAC",
      task: "GNodeB Integration Completed",
      formName: "RFI Survey Form 1",
      formOwner: "RFI Survey Form 1"
    },
    {
      status: "Completed",
      mileStone: "RFA - RAC",
      task: "GNodeB Integration Completed",
      formName: "RFI Survey Form 1",
      formOwner: "RFI Survey Form 1"
    },
    {
      status: "Rejected",
      mileStone: "RFA - RAC",
      task: "GNodeB Integration Completed",
      formName: "RFI Survey Form 1",
      formOwner: "RFI Survey Form 1"
    },
    {
      status: "New",
      mileStone: "RFA - RAC",
      task: "GNodeB Integration Completed",
      formName: "RFI Survey Form 1",
      formOwner: "RFI Survey Form 1"
    }
  ]

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
    }
  ];
  public destroySubscription: Subscription = new Subscription();
  trackHero(index, woHeader) {
    return woHeader ? woHeader.id : undefined;
  }

  onReadyModeUpdate(params) {
    this.calculateRowCount();
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.calculateRowCount();
  }
  public calculateRowCount() {
    if (this.gridOptions.api && this.rowData) {
      setTimeout(() => {
        this.gridOptions.api.sizeColumnsToFit();
      }, 1000);
    }
  }

  constructor(public dialog: MatDialog, private datatable: TableAgGridService, private datashare: DataSharingService, private router: Router,
    private httpClient: HttpClient) {

    this.gridOptions = <GridOptions>{};
    //this.rowSelection = 'multiple';
    this.createColumnDefs();
    this.createDigitalFormsColumnDefs();

    this.messageSubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });
    this.getMyTaskDetails();
  }

  getMyTaskDetails() {
    this.httpClient.get('assets/data/modules/network_deployment/gNodeB/site-database/site-status.json')
      .subscribe(data => {
        this.rowData = data;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid";
        this.datatable.gridPinnedServices = this.gridPinned;
        this.datatable.rowDataServices = this.rowData;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });
  }

  onChange(event) {
    console.log(event)
  }

  public createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "Milestone",
        field: "milestone",
        width: 200,
      },
      {
        headerName: "Status",
        cellRenderer: this.statusFunc,
        field: "status",
        width: 200,
      },
      {
        headerName: "Task Name",
        field: "taskName",
        width: 300,
      },
      {
        headerName: "Assign Date",
        field: "assignDate",
        width: 170,
      },
      {
        headerName: "Completion Date",
        field: "completionDate",
        width: 170,
      },
      {
        headerName: 'Photos',
        field: 'photos',
        width: 250,
        cellRenderer: 'imageRenderer'
      },
      {
        headerName: 'Documents',
        field: 'documents',
        width: 250,
        cellRenderer: 'documentRenderer'
      },
      {
        headerName: 'Digital Forms',
        field: 'digitalForm',
        width: 250,
        cellRenderer: 'digitalFormRenderer'
      },
      {
        headerName: 'Task Owner',
        field: 'taskOwner',
        width: 250
      },
    ];
    this.datatable.columnDefsServices = this.columnDefs;
  }

  public createDigitalFormsColumnDefs() {
    this.digitalFormColDefs = [
      {
        headerName: "Status",
        cellRenderer: this.taskStatus,
        field: "",
        width: 90
      },
      {
        headerName: "Milestone",
        field: "mileStone",
        width: 200,
      },
      {
        headerName: "Task",
        field: "task",
        width: 350,
      },
      {
        headerName: "Form Name",
        field: "formName",
        width: 200,
      },
      {
        headerName: "Form Owner",
        field: "formOwner",
        width: 200,
      }
    ]
  }

  public eventsSubject: Subject<any> = new Subject();
  onFilterChanged(value) {
    console.log("value", value)
    this.gridOptions.api.setQuickFilter(value);
  };

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

  taskStatus(params) {
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
    return '<span class="status-bar" style="width: 7px; height: 31px; border-radius: 0;margin-top: 9px; background-color: ' +
      barColor +
      ';">' + '</span>' + '<mat-icon class="mx-2 file-img" fxFlex="5" style="color: #1278D7; font-size: 17px; position: relative; bottom: 7px" aria-label="search">' +
      '<span class="ic ic-files-empty">' + '</span>' +
      ' </mat-icon>';
  }


  showInputField: boolean;
  toggleSearch() {
    this.showInputField = !this.showInputField;
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }


  onSelectionChanged(event: SelectionChangedEvent) {
    let lengthOfSelectedRow = event.api.getSelectedRows().length;
    if (1 < lengthOfSelectedRow) {
    }
  }

  selectionChanged(event: SelectionChangedEvent) {
    let lengthOfSelectedRow = event.api.getSelectedRows().length;
    if (1 < lengthOfSelectedRow) {
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.calculateRowCount();
    params.api.paginationGoToPage(4);
  }

  onPageSizeChanged(newPageSize) {
    this.gridApi.paginationSetPageSize(Number(newPageSize.value));
  }

  assignTask() {
    this.dialog.open(RejectTaskComponent, {
      width: "470px",
      height: "305px",
      panelClass: "material-dialog-container"
    });
  }
  openSuccessPopup() { }

  abc() {
    this.dialog.open(RfiSurveyFormComponent, {
      width: "80vw",
      height: "90vh",
      panelClass: "material-dialog-container",
    });
  }

  autoAssign() {
    const message = {
      message: `Task Completed successfully.`,
      showMyTasks: true
    }
    this.dialog.open(SuccessfulModalComponent, {
      data: message,
    });
  }

  onCellClicked(evt) {
    console.log(evt)
    // if (evt.value) {
    //   this.router.navigate(["/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Sector-Misalignment/WO-Sector-Misalignment/Execution-Task"]);
    // }
  }

  navigateToSiteDatabase() {
    this.router.navigate(["/JCP/Modules/Network-Deployment/Plan-To-Build/gNodeB/Site-Database"]);
  }

  navigateToSiteHistory() {
    this.router.navigate(["/JCP/Modules/Network-Deployment/Plan-To-Build/gNodeB/Site-Database/Site-Id-Details/Site-History-Details"])
  }

  navigateBackScreen() {
    this.router.navigate([]);
  }

  ngOnDestroy() {
    this.destroySubscription.unsubscribe();
  }
}

