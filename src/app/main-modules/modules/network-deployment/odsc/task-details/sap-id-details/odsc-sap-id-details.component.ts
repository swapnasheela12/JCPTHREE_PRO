import { Component, ViewChild, OnDestroy, ViewContainerRef, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSidenav } from '@angular/material/sidenav';
import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { FormControl } from '@angular/forms';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SuccessfulModalComponent } from 'src/app/core/components/commonPopup/successful-modal/successful-modal.component';
import { CreateReportComponent } from 'src/app/main-modules/reports-dashboards/reports-wizard/create-report/create-report.component';
import { CommentHighlightFieldDirective } from 'src/app/core/components/comment-highlight-field/comment-highlight-field.directive';
import { CommentHighlightFieldComponent } from 'src/app/core/components/comment-highlight-field/comment-highlight-field.component';
import { AssignTaskComponent } from '../../../gNodeB/task-details/assign-task/assign-task.component';
import { UploadedFileViewerComponent } from '../../../gNodeB/task-details/uploaded-file-viewer/uploaded-file-viewer.component';
import { RejectFormComponent } from '../../../gNodeB/task-details/reject-form/reject-form.component';
import { RejectTaskComponent } from '../../../gNodeB/task-details/reject-task/reject-task.component';
import { HoldSiteComponent } from '../../../gNodeB/task-details/hold-site/hold-site.component';
import { HoldDuringConstructionComponent } from '../../../gNodeB/task-details/hold-during-construction/hold-during-construction.component';
import { TaskAssignmentComponent } from '../../../gNodeB/task-details/task-assignment/task-assignment.component';

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
  assignTaskStatus: boolean = true;
  hideAction: boolean = true;
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

  sapIdMapping = [
    {
      "label": "Circle",
      "value": "Mumbai"
      , "type": "input",
      "id": 1,
    },
    {
      "label": "Site Name",
      "value": "I-MU-MUMB-ENB-4505"
      , "type": "input",
      "id": 2,
    },
    {
      "label": "Site ID",
      "value": "MU-NVMB-JC24-0024"
      , "type": "input",
      "id": 3,
    },
    {
      "label": "Priority",
      "value": "P1"
      , "type": "input",
      "id": 4,
    },
    {
      "label": "Date of Survey",
      "value": "10 Oct 2020"
      , "type": "input",
      "id": 5,
    },
    {
      "label": "Any Obstruction",
      "value": "Yes"
      , "type": "input",
      "id": 6,
    },
    {
      "label": "Coordinates (Longitude)",
      "value": "78.852402"
      , "type": "input",
      "id": 7,
    },
    {
      "label": "Coordinates (Latitude)",
      "value": "21.269661"
      , "type": "input",
      "id": 8,
    },
    {
      "label": "Azimuth and height Details",
      "value": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.  "
      , "type": "input",
      "id": 9,
    },
    {
      "label": "Restricted area like Hospital, Airport, School(with in 100m)",
      "value": "No"
      , "type": "input",
      "id": 10,
    },
    {
      "label": "Site Address",
      "value": "TC-23 RELIANCE CORPORATE PARK PHASE IV A- WING GATE NO A GHANSOLI 400701"
      , "type": "input",
      "id": 11,
    },
    {
      "label": "Any Structure/Rooftop/Ground/Flyover within 20m distance",
      "value": "Yes"
      , "type": "input",
      "id": 12,
    },
    {
      "label": "No. of Operators",
      "value": "2"
      , "type": "input",
      "id": 13,
    },
    {
      "label": "Any other operator on same building",
      "value": "Yes"
      , "type": "input",
      "id": 14,
    },
    {
      "label": "No. Of Floors",
      "value": "15"
      , "type": "input",
      "id": 15,
    },
    {
      "label": "Tower/Pole Height (In Meters)",
      "value": "60"
      , "type": "input",
      "id": 16,
    },
    {
      "label": "GPS Picture",
      "value": "assets/images/layer-settings/Small.png"
      , "type": "image",
      "id": 17
    },
    {
      "label": "Site Location Picture",
      "value": "assets/images/layer-settings/Small.png"
      , "type": "image",
      "id": 18
    },
    {
      "label": "Proposed Azimuth",
      "value": "2"
      , "type": "input",
      "id": 19,
    },
    {
      "label": "Proposed Height (Meter)",
      "value": "60"
      , "type": "input",
      "id": 20,
    },
    {
      "label": "Antenna Type",
      "value": "Lorem Ipsum is simply dummy text"
      , "type": "input",
      "id": 21,
    },
    {
      "label": "Antenna Tilt",
      "value": "10"
      , "type": "input",
      "id": 22,
    },
    {
      "label": "Proposed Azimuth",
      "value": "2"
      , "type": "input",
      "id": 23,
    },
    {
      "label": "Proposed Height (Meter)",
      "value": "60"
      , "type": "input",
      "id": 24,
    },
    {
      "label": "Antenna Type",
      "value": "Lorem Ipsum is simply dummy text"
      , "type": "input",
      "id": 25,
    },
    {
      "label": "Antenna Tilt",
      "value": "10"
      , "type": "input",
      "id": 26,
    },
    {
      "label": "Proposed Azimuth",
      "value": "2"
      , "type": "input",
      "id": 27,
    },
    {
      "label": "Proposed Height (Meter)",
      "value": "60"
      , "type": "input",
      "id": 28,
    },
    {
      "label": "Antenna Type",
      "value": "Lorem Ipsum is simply dummy text"
      , "type": "input",
      "id": 29,
    },
    {
      "label": "Antenna Tilt",
      "value": "10"
      , "type": "input",
      "id": 30,
    },
    {
      "label": "Panoramic Photos (Degree)",
      "value": "360"
      , "type": "input",
      "id": 31,
    },
    {
      "label": "DG Space Availability Status",
      "value": "Yes"
      , "type": "input",
      "id": 32,
    },
    {
      "label": "OD/ID Space Status",
      "value": "Yes"
      , "type": "input",
      "id": 33,
    },
    {
      "label": "Battery Bank Space Available",
      "value": "Yes"
      , "type": "input",
      "id": 34,
    },
    {
      "label": "RF Agreed AGL (In Meters)",
      "value": "360"
      , "type": "input",
      "id": 35,
    },
    {
      "label": "Mount Required",
      "value": "Yes"
      , "type": "input",
      "id": 36,
    },
    {
      "label": "No. of Mounts req (If applicable)",
      "value": "Yes"
      , "type": "input",
      "id": 37,
    },
    {
      "label": "MW Antenna Height Given by Infra Check",
      "value": "Yes"
      , "type": "input",
      "id": 38,
    },
    {
      "label": "RF Agreed AGL (In Meters)",
      "value": "30"
      , "type": "input",
      "id": 39,
    },
    {
      "label": "Mount Required",
      "value": "Yes"
      , "type": "input",
      "id": 40,
    },
    {
      "label": "No. of Mounts req (If applicable)",
      "value": "Yes"
      , "type": "input",
      "id": 41,
    },
    {
      "label": "MW Antenna Height Given by Infra Check",
      "value": "Yes"
      , "type": "input",
      "id": 42,
    },
    {
      "label": "Nearby 5 Sites ID",
      "value": "I-MU-MUMB-ENB-4505"
      , "type": "input",
      "id": 43,
    }
  ]
  rejectedForm = [
    {
      "label": "Circle",
      "value": "Mumbai"
      , "type": "input",
      "id": 1,
      "addedComment": "qwee",
      "editable": true
    },
    {
      "label": "Site Name",
      "value": "I-MU-MUMB-ENB-4505"
      , "type": "input",
      "id": 2,
      "addedComment": "12345",
      "editable": true
    },
    {
      "label": "Site ID",
      "value": "MU-NVMB-JC24-0024"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 3,
    },
    {
      "label": "Priority",
      "value": "P1"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 4,
    },
    {
      "label": "Date of Survey",
      "value": "10 Oct 2020"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 5,
    },
    {
      "label": "Any Obstruction",
      "value": "Yes"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 6,
    },
    {
      "label": "Coordinates (Longitude)",
      "value": "78.852402"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 7,
    },
    {
      "label": "Coordinates (Latitude)",
      "value": "21.269661"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 8,
    },
    {
      "label": "Azimuth and height Details",
      "value": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.  "
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 9,
    },
    {
      "label": "Restricted area like Hospital, Airport, School(with in 100m)",
      "value": "No"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 10,
    },
    {
      "label": "Site Address",
      "value": "TC-23 RELIANCE CORPORATE PARK PHASE IV A- WING GATE NO A GHANSOLI 400701"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 11,
    },
    {
      "label": "Any Structure/Rooftop/Ground/Flyover within 20m distance",
      "value": "Yes"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 12,
    },
    {
      "label": "No. of Operators",
      "value": "2"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 13,
    },
    {
      "label": "Any other operator on same building",
      "value": "Yes"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 14,
    },
    {
      "label": "No. Of Floors",
      "value": "15"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 15,
    },
    {
      "label": "Tower/Pole Height (In Meters)",
      "value": "60"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 16,
    },
    {
      "label": "GPS Picture",
      "value": "assets/images/layer-settings/Small.png"
      , "type": "image",
      "addedComment": "",
      "editable": false,
      "id": 17
    },
    {
      "label": "Site Location Picture",
      "value": "assets/images/layer-settings/Small.png"
      , "type": "image",
      "addedComment": "",
      "editable": false,
      "id": 18
    },
    {
      "label": "Proposed Azimuth",
      "value": "2"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 19,
    },
    {
      "label": "Proposed Height (Meter)",
      "value": "60"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 20,
    },
    {
      "label": "Antenna Type",
      "value": "Lorem Ipsum is simply dummy text"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 21,
    },
    {
      "label": "Antenna Tilt",
      "value": "10"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 22,
    },
    {
      "label": "Proposed Azimuth",
      "value": "2"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 23,
    },
    {
      "label": "Proposed Height (Meter)",
      "value": "60"
      , "type": "input",
      "id": 24,
    },
    {
      "label": "Antenna Type",
      "value": "Lorem Ipsum is simply dummy text"
      , "type": "input",
      "id": 25,
    },
    {
      "label": "Antenna Tilt",
      "value": "10"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 26,
    },
    {
      "label": "Proposed Azimuth",
      "value": "2"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 27,
    },
    {
      "label": "Proposed Height (Meter)",
      "value": "60"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 28,
    },
    {
      "label": "Antenna Type",
      "value": "Lorem Ipsum is simply dummy text"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 29,
    },
    {
      "label": "Antenna Tilt",
      "value": "10"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 30,
    },
    {
      "label": "Panoramic Photos (Degree)",
      "value": "360"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 31,
    },
    {
      "label": "DG Space Availability Status",
      "value": "Yes"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 32,
    },
    {
      "label": "OD/ID Space Status",
      "value": "Yes"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 33,
    },
    {
      "label": "Battery Bank Space Available",
      "value": "Yes"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 34,
    },
    {
      "label": "RF Agreed AGL (In Meters)",
      "value": "360"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 35,
    },
    {
      "label": "Mount Required",
      "value": "Yes"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 36,
    },
    {
      "label": "No. of Mounts req (If applicable)",
      "value": "Yes"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 37,
    },
    {
      "label": "MW Antenna Height Given by Infra Check",
      "value": "Yes"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 38,
    },
    {
      "label": "RF Agreed AGL (In Meters)",
      "value": "30"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 39,
    },
    {
      "label": "Mount Required",
      "value": "Yes"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 40,
    },
    {
      "label": "No. of Mounts req (If applicable)",
      "value": "Yes"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 41,
    },
    {
      "label": "MW Antenna Height Given by Infra Check",
      "value": "Yes"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 42,
    },
    {
      "label": "Nearby 5 Sites ID",
      "value": "I-MU-MUMB-ENB-4505"
      , "type": "input",
      "addedComment": "",
      "editable": false,
      "id": 43,
    }
  ]
  //rejectedForm = []
  showRejectedForm: boolean = false;

  editableData;

  priority = ["P1", "P2"]
  dateOfSurvey = ["10 Oct 2020", "10 Oct 2020"]
  option = ["Yes", "No"]
  poleHeight = ["60", "35"]
  noOfFloor = ["16", "15"];
  proposedHeight = ["10", "10"];
  antennaTilt = ["10", "10"];
  nearByFiveSites = ["Lorem Ipsum 1, Lorem Ipsum 2, Lorem Ipsum 3, Lorem Ipsum 4, Lorem Ipsum 5", "Lorem Ipsum 1, Lorem Ipsum 2, Lorem Ipsum 3, Lorem Ipsum 4, Lorem Ipsum 5"];
  mountRequired = ["Lorem Ipsum is simply dummy text", "Lorem Ipsum is simply dummy text"]

  woHeaderForm: Array<any> = [
    {
      "label": "Circle Name",
      "value": "Mumbai"
    },
    {
      "label": "Site Name",
      "value": "I-MU-MUMB-ENB-4505"
    },
    {
      "label": "Site ID",
      "value": "MU-NVMB-JC24-0024"
    },
    {
      "label": "Priority",
      "value": "P1"
    },
    {
      "label": "Date of Survey",
      "value": "10 Oct 2020"
    },
    {
      "label": "Any Obstruction",
      "value": "Yes"
    },
    {
      "label": "Coordinates (Longitude)",
      "value": "78.852402"
    },
    {
      "label": "Coordinates (Latitude)",
      "value": "21.269661"
    }
  ];

  siteIds = [
    "I-MU-MUMB-ENB-4505",
    "I-MU-MUMB-ENB-4505",
    "I-MU-MUMB-ENB-4505",
    "I-MU-MUMB-ENB-4505",
    "I-MU-MUMB-ENB-4505"
  ];
  approveTask = false;
  details;
  showFileUploadwidget: boolean = false;
  uploadedImg = [];
  showDownloadAndDeleteBtn: boolean = false;
  taskInfo;
  showAssignedTask: boolean = false;
  showTaskToBeAccepted: boolean = false;
  showTaskToBeAcceptedBtn: boolean = false;
  showReassignTask: boolean = false;
  showReassignFooterBtn: boolean = false;
  showApproveRejectTask: boolean = false;
  rejectCandidateForm: boolean = false;
  showTaskCompletedAssign: boolean = false;
  showApproveRejectUploadDownload: boolean = false;
  showTaskCompletedUploadDownload: boolean = false;
  showScenerioGTaskCompleted: boolean = false;
  showScenerioHAll: boolean = false;
  showScenerioIHold: boolean = false;

  //search dropdown
  searchPriorityValue;
  searchDateOfSurveyValue;
  searchObstructionValue;
  searchPoleValue;
  searchProposedHeightValue;
  searchMountRequiredValue;
  searchAntennaTiltValue;

  @ViewChild('compRef', { read: ViewContainerRef, static: true }) compRef: ViewContainerRef;


  constructor(public dialog: MatDialog, private datashare: DataSharingService,
    private router: Router, private httpClient: HttpClient, private cfr: ComponentFactoryResolver,
    private vcr: ViewContainerRef) {
    router.events.subscribe();
    // this.destroySubscription = this.datashare.currentMessage.subscribe((message: boolean) => {
    //   this.sidenavBarStatus = message;
    // });
    this.datashare.currentMessage.subscribe((data: any) => {
      console.log(data);
      if (data === "RejectForm") {
        this.showReassignTask = true;
        this.assignTaskStatus = false;
        console.log("rejectedForm", this.rejectedForm)
      }
      if (data.status) {
        this.taskInfo = data;
      }

      this.showTaskScenerios();
      if (data.id != "") {
        this.editableData = data;
        this.updateEditedField();
      }

      // if (data === "RejectForm") {
      //   this.showRejectedForm = true;
      //   
      // }
    })
    this.httpClient.get("assets/data/modules/network_deployment/gNodeB/registry.json").subscribe((data) => {
      this.details = data;
    });

    if (this.uploadedImg.length === 0) {
      console.log("this.uploadedImg", this.uploadedImg)
      this.showDownloadAndDeleteBtn = false;
    } else {
      console.log("this.uploadedImg", this.uploadedImg)
      this.showDownloadAndDeleteBtn = true;
    }

  }

  updateEditedField() {
    // this.rejectedForm = this.sapIdMapping;
    // if (this.editableData.id) {
    //   this.rejectedForm[this.editableData.id - 1]["editable"] = this.editableData.isEditable;
    //   this.rejectedForm[this.editableData.id - 1]["addedComment"] = this.editableData.addedComment;
    // }
    // console.log("sapMapping", this.rejectedForm)
  }

  showTaskScenerios() {
    if (this.taskInfo.status === "New") {
      console.log("elee", this.taskInfo);
      this.showAssignedTask = true;
      this.showTaskToBeAccepted = false;
      this.showReassignTask = false;
      this.showApproveRejectTask = false;
    } else if (this.taskInfo.status === "Re-Assigned") {
      this.showTaskToBeAccepted = true;
      this.showAssignedTask = false;
      this.showReassignTask = false;
      this.showApproveRejectTask = false;
    } else if (this.taskInfo.status === "In Progress") {
      this.showReassignTask = true;
      this.showTaskToBeAccepted = false;
      this.showAssignedTask = false;
      this.showApproveRejectTask = false;
    } else if (this.taskInfo.status === "Completed") {
      this.showApproveRejectTask = true;
      this.showReassignTask = false;
      this.showTaskToBeAccepted = false;
      this.showAssignedTask = false;
    } else if (this.taskInfo.status === "RFA to RFC") {
      this.showTaskCompletedAssign = true;
      this.showApproveRejectTask = false;
      this.showReassignTask = false;
      this.showTaskToBeAccepted = false;
      this.showAssignedTask = false;
    } else if (this.taskInfo.status === "Scenerio E") {
      this.showApproveRejectUploadDownload = true;
    } else if (this.taskInfo.status === "Scenerio F") {
      this.showTaskCompletedUploadDownload = true;
    } else if (this.taskInfo.status === "RFC TO RFI") {
      this.showScenerioGTaskCompleted = true;
    } else if (this.taskInfo.status === "RFC TO RFI Scenerio H") {
      this.showScenerioHAll = true;
    } else if (this.taskInfo.status === "Scenerio I") {
      this.showScenerioIHold = true;
    }
  }

  openedChange(sda) {
    this.searchPriorityValue = '';
    this.searchDateOfSurveyValue = '';
    this.searchObstructionValue = '';
    this.searchPoleValue = '';
    this.searchProposedHeightValue = '';
    this.searchMountRequiredValue = '';
    this.searchAntennaTiltValue = '';
  }


  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  @ViewChild("uploadedImage", { static: false }) uploadedImage;
  fileName;
  uploadFile(file) {
    this.fileName = file.name;
    const formData = new FormData();
    formData.append('file', file);
    let obj;
    if (file) {
      this.showFileUploadwidget = true;
      let url = `../../../../../../assets/images/logo/${this.fileName}`
      obj = {
        src: url,
        name: this.fileName
      }
      this.uploadedImg.push(obj);
    }
  }

  deleteFile(evt) {
    evt.target.parentElement.parentElement.parentElement.remove();
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      const file = fileUpload.files[0];
      this.files = file;
      this.uploadFiles();
    };
    fileUpload.click();
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.uploadFile(this.files);
  }

  openImagesSlider() {
    this.dialog.open(UploadedFileViewerComponent, {
      width: "700px",
      height: "450px",
      panelClass: "material-dialog-container",
      data: this.uploadedImg
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

  acceptTask() {
    if (this.taskInfo.status === "New") {
      this.showAssignedTask = true;
      this.hideAction = false;
    } else if (this.taskInfo.status === "Re-Assigned") {
      this.showTaskToBeAccepted = true;
      this.showTaskToBeAcceptedBtn = true;
      this.showAssignedTask = false;
      this.hideAction = false;
    }
  }

  assignTask() {
    const message = {
      message: `Task Completed successfully.`,
      showMyTasks: true,
      task: "AssignTask"
    }
    this.dialog.open(AssignTaskComponent, {
      width: "470px",
      height: "395px",
      panelClass: "material-dialog-container",
      data: message,
    });
  }

  openSuccessPopup(type) {
    let showMessage = "";
    if (type === "submit") {
      showMessage = "Task Submitted Successfully."
    } else if (type === "approved") {
      showMessage = "Task has been approved Successfully."
    } else {
      showMessage = "Task Completed Successfully";
    }
    const message = {
      message: showMessage,
      goToTask: 'ShowMyTask',
      showMyTasks: true
    }
    this.dialog.open(SuccessfulModalComponent, {
      data: message,
    });
    // this.router.navigate(['JCP/Modules/Network-Deployment/Plan-To-Build/gNodeB/Task-Details']);
  }

  previous() {
    //this.assignTaskStatus = false;
    this.hideAction = true;
  }

  autoAssign() {
    const message = {
      message: `Task Completed successfully.`,
      showMyTasks: true
    }
    this.dialog.open(SuccessfulModalComponent, {
      data: message,
    });
    //this.assignTaskStatus = false;
    this.hideAction = true;
  }

  cellClickedDetails(evt) {
    if (evt.value) {
      this.router.navigate(["/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Sector-Misalignment/WO-Sector-Misalignment/Execution-Task"]);
    }
  }

  goBack() {
    this.router.navigate(['JCP/Modules/Network-Deployment/Plan-To-Build/gNodeB/Task-Details'])
  }

  onNoClick(): void {
    // this.dialog.close();
  }

  clickGoMyReport(): void {
    //this.dialog.close();
    this.router.navigate(['/JCP/Reports-and-Dashboard/My-Reports']);
  }

  animal: string;
  name: string;
  clickCreateNewReport(): void {
    //this.dialogRef.close();
    const dialogRef = this.dialog.open(CreateReportComponent, {
      width: "700px",
      panelClass: "material-dialog-container",
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  getElementState(evt) {
    console.log(evt);
  }

  approvingTask() {
    const message = {
      message: `Task (Digital Form) has been re-assigned to the same user successfully.`,
      goToTask: 'ShowMyTask',
      showMyTasks: true
    }
    this.dialog.open(SuccessfulModalComponent, {
      data: message,
    });
  }

  reject() {
    const dialogRef = this.dialog.open(RejectTaskComponent, {
      height: "405px",
      width: "550px",
      panelClass: "material-dialog-container",
    });
  }

  rejectCandidate() {
    this.hideAction = false;
    this.rejectCandidateForm = true;
  }

  rejectDigitalForm() {
    const dialogRef = this.dialog.open(RejectFormComponent, {
      height: "280px",
      panelClass: "material-dialog-container",
    });
  }

  reAssign() {
    console.log("this.reassihgn", this.rejectedForm)
    this.showReassignFooterBtn = true;
  }

  reAssignTask() {
    const message = {
      message: `Task (Digital Form) has been re-assigned to the same user successfully.`,
      goToTask: 'ShowMyTask',
      showMyTasks: true
    }
    this.dialog.open(SuccessfulModalComponent, {
      data: message,
    });
  }

  holdSite() {
    this.dialog.open(HoldSiteComponent, {
      height: "287px",
      width: "760px",
      panelClass: "material-dialog-container",
    });
  }

  holdSiteDuringConstruction() {
    this.dialog.open(HoldDuringConstructionComponent, {
      height: "310px",
      width: "500px",
      panelClass: "material-dialog-container",
    });
  }

  assignExternalUser() {
    const message = {
      message: `Task Assigned successfully.`,
      showMyTasks: true,
      task: "AssignTaskExternal"
    }
    const dialogRef = this.dialog.open(AssignTaskComponent, {
      height: "300px",
      width: "500px",
      panelClass: "material-dialog-container",
      data: message,
    });
  }

  openTaskCompletedPop() {
    const dialogRef = this.dialog.open(TaskAssignmentComponent, {
      height: "280px",
      width: "500px",
      panelClass: "material-dialog-container",
    });
  }

  highlightMe() {
    console.log(" vcr", this.vcr);
    console.log("highlight", this.compRef)
    let nominalViewComponent = this.cfr.resolveComponentFactory(CommentHighlightFieldComponent);
    this.vcr.createComponent(nominalViewComponent);
  }

  // onClick() {
  //   const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
  //     const file = fileUpload.files[0];
  //     this.files.push({ data: file });
  //     this.uploadFiles();
  //   };
  //   fileUpload.click();
  // }

  closeDialog() {
    // this.dialogRef.close();
  }

  ngOnDestroy() {
    this.destroySubscription.unsubscribe();
  }
}

