import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectionChangedEvent } from 'ag-grid-community';
import { Subject, Subscription } from 'rxjs';
import { SuccessfulModalComponent } from 'src/app/core/components/commonPopup/successful-modal/successful-modal.component';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { DocumentRendererComponent } from 'src/app/main-modules/modules/network-deployment/gNodeB/site-database/renderer/document-renderer.component';
import { ImageViewerRendererComponent } from 'src/app/main-modules/modules/network-deployment/gNodeB/site-database/renderer/image-viewer-renderer.component';
import { RfiSurveyFormRendererComponent } from 'src/app/main-modules/modules/network-deployment/gNodeB/site-database/renderer/rfi-survey-form-renderer.component';
import { RfiSurveyFormComponent } from 'src/app/main-modules/modules/network-deployment/gNodeB/site-database/rfi-survey-form/rfi-survey-form.component';
import { DocumentViewerComponent } from 'src/app/main-modules/modules/network-deployment/gNodeB/task-details/document-viewer/document-viewer.component';
import { RejectTaskComponent } from 'src/app/main-modules/modules/network-deployment/gNodeB/task-details/reject-task/reject-task.component';
import { UploadedFileViewerComponent } from 'src/app/main-modules/modules/network-deployment/gNodeB/task-details/uploaded-file-viewer/uploaded-file-viewer.component';
import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { DataSharingService } from 'src/app/_services/data-sharing.service';

@Component({
  selector: 'app-site-milestone',
  templateUrl: './site-milestone.component.html',
  styleUrls: ['./site-milestone.component.scss']
})
export class SiteMilestoneComponent implements OnInit, OnChanges, OnDestroy {
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

   @Input('selectedTab') public selectedTab;

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
  showTab: boolean =  false;
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

  ngOnInit() {
  //   $(document).ready(function () {
  //     $(".tbtn").click(function () {
  //         $(this).parents(".custom-table").find(".toggler1").removeClass("toggler1");
  //         $(this).parents("tbody").find(".toggler").addClass("toggler1");
  //         $(this).parents(".custom-table").find(".fa-minus-circle").removeClass("fa-minus-circle");
  //         $(this).parents("tbody").find(".fa-plus-circle").addClass("fa-minus-circle");
  //     });
  // });
  }

    ngOnChanges() {
    if (this.selectedTab === "SITE MILESTONES") {
      this.showTab = true;
      this.gridOptions = <GridOptions>{};
      this.createColumnDefs();

      this.datashare.currentMessage.subscribe((message) => {
        this.sidenavBarStatus = message;
      });

      $(document).ready(function () {
        $(".tbtn").click(function () {
            $(this).parents(".custom-table").find(".toggler1").removeClass("toggler1");
            $(this).parents("tbody").find(".toggler").addClass("toggler1");
            $(this).parents(".custom-table").find(".fa-minus-circle").removeClass("fa-minus-circle");
            $(this).parents("tbody").find(".fa-plus-circle").addClass("fa-minus-circle");
        });
    });
    }
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
        field: 'digitalForms',
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

  navigateToSiteHistory() {
    this.router.navigate(["/JCP/Modules/Network-Deployment/Plan-To-Build/gNodeB/Site-Database/Site-Id-Details/Site-History-Details"])
  }

  
  openImageSlider() {
    this.dialog.open(UploadedFileViewerComponent, {
        width: "700px",
        height: "450px",
        panelClass: "material-dialog-container",
        //data: this.uploadedImg
    });
}

  openPDFSlider() {
    this.dialog.open(DocumentViewerComponent, {
        width: "700px",
        height: "450px",
        panelClass: "material-dialog-container",
        //data: this.uploadedImg
    });
}

openRFIFormSlider() {
  this.dialog.open(RfiSurveyFormComponent, {
      //tmax-width: "84vw",
      width: "93vw",
      height: "93vh",
      panelClass: "material-dialog-container",
      //data: this.uploadedImg
  });
}

  ngOnDestroy() {
    this.destroySubscription.unsubscribe();
  }
}




// import { Component, ViewChild, Input } from '@angular/core';
// import { MatSidenav } from '@angular/material/sidenav';
// import { GridOptions, GridCore } from '@ag-grid-community/all-modules';
// import { viewHistoryRendererComponent } from 'src/app/core/components/ag-grid-renders/view-history-renderer.component';
// import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
// import { DataSharingService } from 'src/app/_services/data-sharing.service';
// import { OverlayContainer } from '@angular/cdk/overlay';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { Subject } from 'rxjs';
// import { SelectionChangedEvent } from 'ag-grid-community';

// @Component({
//   selector: 'app-site-milestone',
//   templateUrl: './site-milestone.component.html',
//   styleUrls: ['./site-milestone.component.scss']
// })
// export class SiteMilestoneComponent {

//   @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
//   public sidenavBarStatus;
//   public tableWidth;
//   public gridApi;
//   public gridColumnApi;
//   public gridCore: GridCore;
//   public gridOptions: GridOptions;
//   public rowData: any;
//   public columnDefs: any[];
//   public rowCount: string;
//   public defaultColDef = { resizable: true };
//   public searchGrid = '';
//   public show;
//   public gridFilterValueServices = {};
//   public tableCompData = {};
//   public frameworkComponentsSectorMisalignment = {
//     viewHistroyRenderer: viewHistoryRendererComponent
//   };
//   showTab: boolean = false;
//   @Input('selectedTab') public selectedTab;

//   public url: string = "assets/data/modules/properties/site-milestone/site-milestone.json";

//   onReadyModeUpdate(params) {
//     this.calculateRowCount();
//   }

//   public onReady(params) {
//     this.gridApi = params.api;
//     this.calculateRowCount();
//   }
//   public calculateRowCount() {
//     if (this.gridOptions.api && this.rowData) {
//       setTimeout(() => {
//         this.gridOptions.api.sizeColumnsToFit();
//       }, 1000);
//     }
//   }

//   constructor(private datatable: TableAgGridService, private datashare: DataSharingService, private router: Router, private overlayContainer: OverlayContainer, private httpClient: HttpClient) {
//     router.events.subscribe((url: any) => { });
//   }

//   ngOnChanges() {
//     if (this.selectedTab === "SITE MILESTONES") {
//       this.showTab = true;
//       this.gridOptions = <GridOptions>{};
//       this.createColumnDefs();

//       this.datashare.currentMessage.subscribe((message) => {
//         this.sidenavBarStatus = message;
//       });

//       this.httpClient.get(this.url)
//         .subscribe(data => {
//           this.rowData = data;
//           this.datatable.rowDataURLServices = this.url;
//           this.datatable.typeOfAgGridTable = "Default-Ag-Grid";
//           this.datatable.rowDataServices = this.rowData;
//           this.datatable.gridOptionsServices = this.gridOptions;
//           this.datatable.defaultColDefServices = this.defaultColDef;
//         });
//     }
//   }

//   getSelection() {
//     var selectedRows = this.gridOptions.api.getSelectedRows();
//   }

//   private createColumnDefs() {
//     this.columnDefs = [{
//       headerName: "Band",
//       field: "brand",
//       width: 120
//     }, {
//       headerName: "Milestone",
//       field: "milestone",
//       width: 195
//     }, {
//       headerName: "Completion Status",
//       field: "completionstatus",
//       width: 180
//     }, {
//       headerName: "Task Status",
//       field: "taskstatus",
//       width: 170
//     }, {
//       headerName: "Completion Date",
//       field: "completiondate",
//       width: 180
//     }, {
//       headerName: "Task Days",
//       field: "taskday",
//       width: 150
//     }];
//     this.datatable.columnDefsServices = this.columnDefs;
//   }

//   //END table search//////////////////
//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//   }

//   onSelectionChanged(event: SelectionChangedEvent) {
//     let lengthOfSelectedRow = event.api.getSelectedRows().length;
//     if (1 < lengthOfSelectedRow) {
//     }
//   }

//   onGridReady(params) {
//     this.gridApi = params.api;
//     this.gridColumnApi = params.columnApi;
//     params.api.paginationGoToPage(4);
//   }

//   onPageSizeChanged(newPageSize) {
//     this.gridApi.paginationSetPageSize(Number(newPageSize.value));
//   }

// }
