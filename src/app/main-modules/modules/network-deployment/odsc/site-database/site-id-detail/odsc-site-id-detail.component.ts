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
import { DocumentRendererComponent } from '../../../gNodeB/site-database/renderer/document-renderer.component';
import { ImageViewerRendererComponent } from '../../../gNodeB/site-database/renderer/image-viewer-renderer.component';
import { RfiSurveyFormRendererComponent } from '../../../gNodeB/site-database/renderer/rfi-survey-form-renderer.component';
import { RfiSurveyFormComponent } from '../../../gNodeB/site-database/rfi-survey-form/rfi-survey-form.component';
import { DocumentViewerComponent } from '../../../gNodeB/task-details/document-viewer/document-viewer.component';
import { RejectTaskComponent } from '../../../gNodeB/task-details/reject-task/reject-task.component';
import { UploadedFileViewerComponent } from '../../../gNodeB/task-details/uploaded-file-viewer/uploaded-file-viewer.component';
import { OdscRfiSurveyFormComponent } from '../rfi-survey-form/odsc-rfi-survey-form.component';

@Component({
  selector: 'app-odsc-site-id-detail',
  templateUrl: './odsc-site-id-detail.component.html',
  styleUrls: ['./odsc-site-id-detail.component.scss']
})
export class OdscSiteIdDetailComponent implements OnDestroy {
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

  constructor(public dialog: MatDialog, private datatable: TableAgGridService, private datashare: DataSharingService, private router: Router,
    private httpClient: HttpClient) {

    this.gridOptions = <GridOptions>{};

    this.messageSubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });
    this.getMyTaskDetails();
  }

  ngOnInit() {
    $(document).ready(function () {
      $(".tbtn").click(function () {
          $(this).parents(".custom-table").find(".toggler1").removeClass("toggler1");
          $(this).parents("tbody").find(".toggler").addClass("toggler1");
          $(this).parents(".custom-table").find(".fa-minus-circle").removeClass("fa-minus-circle");
          $(this).parents("tbody").find(".fa-plus-circle").addClass("fa-minus-circle");
      });
  });
  }

  getMyTaskDetails() {
    this.httpClient.get('assets/data/modules/network_deployment/gNodeB/site-database/site-status.json')
      .subscribe(data => {
        this.rowData = data;
      });
  }

  onChange(event) {
    console.log(event)
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


  abc() {
    this.dialog.open(RfiSurveyFormComponent, {
      width: "80vw",
      height: "90vh",
      panelClass: "material-dialog-container",
    });
  }

  navigateToSiteDatabase() {
    this.router.navigate(["/JCP/Modules/Network-Deployment/Plan-To-Build/gNodeB/Site-Database"]);
  }

  navigateToSiteHistory() {
    this.router.navigate(["/JCP/Modules/Network-Deployment/Plan-To-Build/gNodeB/Site-Database/Site-Id-Details/Site-History-Details"])
  }

  ngOnDestroy() {
    this.destroySubscription.unsubscribe();
  }
}

