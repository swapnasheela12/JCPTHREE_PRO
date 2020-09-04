import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { GridOptions, GridCore } from '@ag-grid-community/all-modules';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { map } from 'lodash';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MultipleTableAgGridService } from 'src/app/core/components/multiple-table-ag-grid/multiple-table-ag-grid.service';
import { TableAgGridComponent } from 'src/app/core/components/table-ag-grid/table-ag-grid.component';

import { dropDownThreeDotRendererComponent } from 'src/app/core/components/ag-grid-renders/dropDownThreeDot-renderer.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRendererComponent } from 'src/app/core/components/ag-grid-renders/delete-renderer.component';
import { CommonPopupComponent, CommonDialogModel } from 'src/app/core/components/commanPopup/common-popup/common-popup.component';
import { SuccessfulComponent } from 'src/app/core/components/commanPopup/successful/successful.component';
import { SuccessfulModalComponent } from 'src/app/core/components/commanPopup/successful-modal/successful-modal.component';
import { TaskDropdownRendererComponent } from '../../../sector-misalignment/renderer/task-dropdown-renderer.component';
import { TaskInputRendererComponent } from '../../../sector-misalignment/renderer/task-input-renderer.component';

@Component({
  selector: 'app-execution-task',
  templateUrl: './execution-task.component.html',
  styleUrls: ['./execution-task.component.scss']
})
export class CellExecutionTaskComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  /////
  public paths;
  public sidenavBarStatus;
  public tableWidth;
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public gridOptionsImpl: GridOptions;
  public gridOptionsSite: GridOptions;
  public gridOptionsImplIan: GridOptions;
  public gridOptionsBandAddition: GridOptions;
  public gridOptionsBiSector: GridOptions;
  public gridOptionsIdsc: GridOptions;
  public gridOptionsProposedOutdoor: GridOptions;
  public gridOptionsProposedIndoor: GridOptions;
  public gridOptionsMacroSiteData: GridOptions;
  public rowData: any;
  public columnDefs: any;
  public rowCount: string;
  public formControlPageCount = new FormControl();
  public showGlobalOperation: Boolean = false;
  public taskColDef;
  public siteColDef;
  public implColDef;
  public implColDefIan;
  public implBandAddition;
  public implBandBiSector;
  public propIdscColDef;
  public proposedOutdoorColDef;
  public proposedIndoorColDef;
  public columnDefsproposedmacrosite;
  public taskRowdata;
  public addRemoveRows;
  public ianLead: boolean = false;
  public execLead: boolean = true;
  public siteRowdata;
  public implRowdata;
  public implRowdataIAN;
  public implRowDataBandAddition;
  public implRowDataBiSector;
  public rowDataIdsc;
  public rowDataProposedOutdoor;
  public rowDataProposedIndoor;
  public rowDataMacroSiteData;
  public frameworkComponentsTaskExecution;
  taskClosureRemark = [
    { value: 'taskClosure', name: 'Task Closure' },
    { value: 'databaseMismatch', name: 'Database Mismatch' },
    { value: 'siteAccessIssue', name: 'Site Access Issue' },
    { value: 'spaceConstraint', name: 'Space Constraint' },
    { value: 'materialRequired', name: 'Material Required' },
    { value: 'requiredClutter', name: 'Required based on clutter' },
    { value: 'implementationDone', name: 'Implementation Done' }
  ];

  siteDetails = [
    {
      "label": "SAP ID",
      "value": "I-AS-PTRK-ENB-H004"
    },
    {
      "label": "Sector ID:",
      "value": "1"
    },
    {
      "label": "Band",
      "value": "2300"
    },
    {
      "label": "Cell Name:",
      "value": "I-MU-THNE-ENB-0306-15"
    }
  ];

  observedIssues = [
    {
      "label": "Deviation in Azimuth (Deg):",
      "value": "106.5"
    },
    {
      "label": "Deviation Category:",
      "value": ">60deg"
    },
    {
      "label": "Swap Detected?:",
      "value": "39.1"
    },
    {
      "label": "Average bearing of all prominent samples (Deg):",
      "value": "39.1"
    },
    {
      "label": "Average bearing of all prominent samples (Deg):",
      "value": "39.1"
    }
  ]

  fieldMeasurementInformation = [
    {
      "label": "Total Valid Samples",
      "value": "4433"
    },
    {
      "label": "Total Unique Users:",
      "value": "264"
    },
    {
      "label": "Center Angle of Sector with Maximum Samples (Deg) :",
      "value": "33.5"
    },
    {
      "label": "Average bearing of all prominent samples (Deg):",
      "value": "39.1"
    }
  ];
  issueIdentified = "Dead Cell IP Throughput <512 Kbps and PRB Utilization>70% (BBH Value)for last 7 out of 10 days";
  uploadedImg = [];
  showFileUploadwidget: boolean = false;
  taskClosureRemarks = ["DataMismatch", "Site Access Issue", "Space Constraints", "Material Required", "Required based on cluuter", "Implementation done"]


  public task_url: string = "assets/data/report/cell-decongestion/execution-task/execution-task.json";

  onReadyModeUpdate(params) {
    this.calculateRowCount();
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.calculateRowCount();
  }
  public calculateRowCount() {
    if (this.gridOptions.api && this.gridOptionsSite.api &&
      this.gridOptionsBandAddition.api) {
      setTimeout(() => {
        this.gridOptions.api.sizeColumnsToFit();
        this.gridOptionsSite.api.sizeColumnsToFit();
        this.gridOptionsBandAddition.api.sizeColumnsToFit();
        this.gridOptionsBiSector.api.sizeColumnsToFit();
        this.gridOptionsIdsc.api.sizeColumnsToFit();
        this.gridOptionsProposedOutdoor.api.sizeColumnsToFit();
        this.gridOptionsProposedIndoor.api.sizeColumnsToFit();
        this.gridOptionsMacroSiteData.api.sizeColumnsToFit();
        if (this.ianLead) {
          this.gridOptionsImplIan.api.sizeColumnsToFit();
        } else {
          this.gridOptionsImpl.api.sizeColumnsToFit();
        };
      }, 1000);
    }
  }

  constructor(private datatable: TableAgGridService,
    private datashare: DataSharingService,
    private router: Router,
    private overlayContainer: OverlayContainer,
    private httpClient: HttpClient,
    private fileUploadService: FileUploadService,
    public dialog: MatDialog) {
    router.events.subscribe((url: any) => console.log(url));
    this.frameworkComponentsTaskExecution = {
      'dropdownRenderer': TaskDropdownRendererComponent,
      'inputRenderer': TaskInputRendererComponent,
      'dropdown': dropDownThreeDotRendererComponent,
      'deleteRenderer': DeleteRendererComponent
    };
    //this.paths = PATHS;
    this.gridOptions = <GridOptions>{};
    this.gridOptionsImpl = <GridOptions>{};
    this.gridOptionsImplIan = <GridOptions>{};
    this.gridOptionsSite = <GridOptions>{};
    this.gridOptionsBandAddition = <GridOptions>{};
    this.gridOptionsBiSector = <GridOptions>{};
    this.gridOptionsIdsc = <GridOptions>{};
    this.gridOptionsProposedOutdoor = <GridOptions>{};
    this.gridOptionsProposedIndoor = <GridOptions>{};
    this.gridOptionsMacroSiteData = <GridOptions>{};
    this.taskColDef = this.createColumnDefs();
    this.siteColDef = this.createSiteColumnDefs();
    this.implColDef = this.createImplColumnDefs();
    this.implColDefIan = this.createImplColumnDefsIan();
    this.implBandAddition = this.createBandAdditionStatusColumnDefs();
    this.implBandBiSector = this.createBiSectorization();
    this.propIdscColDef = this.createPropIDSC();
    this.proposedOutdoorColDef = this.createProposedOutdoor();
    this.proposedIndoorColDef = this.createProposedIndoor();
    this.columnDefsproposedmacrosite = this.createProposedMacroSite();

    this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
      this.calculateRowCount();
    });

    this.httpClient.get(this.task_url)
      .subscribe((data: any) => {
        this.taskRowdata = data.taskExec;
        this.siteRowdata = data.siteRowdata;
        this.implRowdata = data.implRowdata;
        this.implRowdataIAN = data.implRowdataIAN;
        this.implRowDataBandAddition = data.implRowDataBandAddition;
        this.implRowDataBiSector = data.implRowDataBiSector;
        this.rowDataIdsc = data.rowDataIdsc;
        this.rowDataProposedOutdoor = data.proposedoutdoordata;
        this.rowDataProposedIndoor = data.proposedindoordata;
        this.rowDataMacroSiteData = data.proposedmacrositedata;
      });

  }

  ngOnInit(): void { }

  createColumnDefs() {
    return this.columnDefs = [
      {
        headerName: "Date",
        field: "date",
        width: 150
      },
      {
        headerName: "Reason For Reassignment",
        field: "reasonForReassign",
        width: 150
      },
      {
        headerName: "Remarks",
        field: "remarks",
        width: 150
      }
    ];
  }

  createSiteColumnDefs() {
    return this.columnDefs = [
      {
        headerName: "SiteParameter",
        field: "siteParameter",
        width: 150
      },
      {
        headerName: "CurrentValue",
        field: "currentValue",
        width: 150
      }
    ];
  }

  createImplColumnDefs() {
    return this.columnDefs = [
      {
        headerName: "Site Parameter",
        field: "siteParameter",
        width: 150,
        cellRenderer: 'dropdownRenderer'
      },
      {
        headerName: "New Azimuth Value(Deg)*",
        field: "newAzimuthValue",
        width: 150,
        cellRenderer: 'inputRenderer'
      },
      {
        headerName: "",
        field: "",
        width: 100,
        cellRenderer: 'deleteRenderer',
      }
    ]
  }

  createImplColumnDefsIan() {
    return this.columnDefs = [
      {
        headerName: "Sector*",
        field: "sector",
        width: 150,
      },
      {
        headerName: "Band*",
        field: "band",
        width: 150,
      },
      {
        headerName: "New Azimuth Value(Deg)*",
        field: "newAzimuthValue",
        width: 150,
      }
    ]
  }

  createBandAdditionStatusColumnDefs() {
    return this.columnDefs = [
      {
        headerName: "Band",
        field: "band",
        width: 150
      },
      {
        headerName: "Status",
        field: "status",
        width: 150
      }
    ];
  }


  createBiSectorization() {
    return this.columnDefs = [
      {
        headerName: "Band(MHz)",
        field: "band",
        width: 150
      },
      {
        headerName: "Requirement  ",
        field: "requirement",
        width: 150
      },
      {
        headerName: "Status",
        field: "status",
        width: 150
      }
    ];
  }


  createPropIDSC() {
    return this.columnDefs = [
      {
        headerName: "Sr No",
        field: "srno",
        width: 200,
        pinned: "left"
      },
      {
        headerName: "Bldg RJID",
        field: "bldgrjid",
        width: 200
      },
      {
        headerName: "Bldg Name",
        field: "bldgrjname",
        width: 200
      },
      {
        headerName: "Lat",
        field: "lat",
        width: 200
      },
      {
        headerName: "Long",
        field: "long",
        width: 200
      },
      {
        headerName: "Distance(Meter)",
        field: "distance",
        width: 200
      },
      {
        headerName: "Priority",
        field: "priority",
        width: 200
      },
      {
        headerName: "% Area covered >=-100dBm",
        field: "areacovered",
        width: 200
      },
      {
        headerName: "DL Volume (GB)",
        field: "dlvolume",
        width: 200
      },
      {
        headerName: "UL Volume (GB)",
        field: "ulvolume",
        width: 200
      },
      {
        headerName: "Total Volume (GB)",
        field: "totalvolume",
        width: 200
      },
      {
        headerName: "Expected Data Volume Off-Load (GB)",
        field: "expecteddata",
        width: 250,
        pinned: "right"
      }]
  }


  createProposedOutdoor() {
    return this.columnDefs = [
      {
        headerName: "Bldg RJID",
        field: "bldgrjid",
        width: 200,
        pinned: "left"
      },
      {
        headerName: "Bldg Name",
        field: "bldgrjname",
        width: 200
      },
      {
        headerName: "Lat",
        field: "lat",
        width: 200
      },
      {
        headerName: "Long",
        field: "long",
        width: 200
      },
      {
        headerName: "Distance(Meter)",
        field: "distance",
        width: 200
      },
      {
        headerName: "Avg. unique users per day (%)",
        field: "avgunique",
        width: 200
      },
      {
        headerName: "Expected Data Volume Off-Load (GB)",
        field: "expecteddata",
        width: 250,
        pinned: "right"
      }]
  }

  createProposedIndoor() {
    return this.columnDefs = [
      {
        headerName: "Bldg RJID",
        field: "bldgrjid",
        width: 240,
        pinned: "left"
      },
      {
        headerName: "Bldg Name",
        field: "bldgrjname",
        width: 240
      },
      {
        headerName: "Lat",
        field: "lat",
        width: 250
      },
      {
        headerName: "Long",
        field: "long",
        width: 250
      },
      {
        headerName: "Distance(Meter)",
        field: "distance",
        width: 280
      },
      {
        headerName: "Avg. unique users per day (%)",
        field: "avgunique",
        width: 290
      },
      {
        headerName: "DL Volume (GB)",
        field: "dlvolume",
        width: 280
      },
      {
        headerName: "UL Volume (GB)",
        field: "ulvolume",
        width: 280
      },
      {
        headerName: "Total Volume (GB)",
        field: "totalvolume",
        width: 280
      },
      {
        headerName: "Expected Data Volume Off-Load (GB)",
        field: "expecteddata",
        width: 290,
        pinned: "right"
      }]
  }

  createProposedMacroSite() {
    return this.columnDefs = [
      {
        headerName: "Bldg RJID",
        field: "bldgrjid",
        width: 200,
        pinned: "left"
      },
      {
        headerName: "Bldg Name",
        field: "bldgrjname",
        width: 200
      },
      {
        headerName: "Lat",
        field: "lat",
        width: 200
      },
      {
        headerName: "Long",
        field: "long",
        width: 200
      },
      {
        headerName: "Distance(Meter)",
        field: "distance",
        width: 200
      },
      {
        headerName: "Rollout Status",
        field: "rolloutstatus",
        width: 200
      },
      {
        headerName: "EMS_Live Status",
        field: "emslivestatus",
        width: 200
      },
      {
        headerName: "Expected Data Volume Off-Load (GB)",
        field: "expecteddata",
        width: 250,
        pinned: "right"
      }]
  }


  drp() {
    return ` <mat-form-field fxFlex="50">
    <mat-select [(ngModel)]="sectorModule">
      <mat-option *ngFor="let sector of sectorModuleList" [value]="sector">
          {{sector}}
      </mat-option>
    </mat-select>
  </mat-form-field>`
  }

  defaultColDef = { resizable: true };
  searchGrid = '';
  onFilterChanged(value) {
    this.gridOptions.api.setQuickFilter(value);
    this.gridOptionsSite.api.setQuickFilter(value);
    this.gridOptionsBandAddition.api.setQuickFilter(value);
    this.gridOptionsBiSector.api.setQuickFilter(value);
    this.gridOptionsIdsc.api.setQuickFilter(value);
    this.gridOptionsProposedOutdoor.api.setQuickFilter(value);
    this.gridOptionsProposedIndoor.api.setQuickFilter(value);
    this.gridOptionsMacroSiteData.api.setQuickFilter(value);
    if (this.ianLead) {
      this.gridOptionsImplIan.api.setQuickFilter(value);
    } else {
      this.gridOptionsImpl.api.setQuickFilter(value);
    }
  };
  show: any;

  toggleSearch() {
    this.show = !this.show;
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  addGridImplementedParameterDetails() {
    this.gridOptionsImpl.api.addItems([{
      "sector": "",
      "band": "",
      "newAzimuthValue": ""
    }]);
  };

  delete(params) {
    console.log(params);
    this.gridOptions.api.forEachNode(
      function (node) {
        if (node.data == params) {
          this.gridOptions.api.removeItems([node]);
          return false;
        }
      }
    )
  };

  fileName;
  uploadFile(file) {
    this.fileName = file.name;
    const formData = new FormData();
    formData.append('file', file);
    let obj;
    if (file) {
      //this.uploadedImg = [];
      this.showFileUploadwidget = true;
      let url = `../../../../../../../assets/images/logo/${this.fileName}`
      obj = {
        src: url
      }
      this.uploadedImg.push(obj);
    }
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      const file = fileUpload.files[0];
      this.files = file;
      //this.files.push({ data: file });
      this.uploadFiles();
    };
    fileUpload.click();
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.uploadFile(this.files);
  }

  openSuccessPopup() {

    const message = `Are you sure want to submit the workorder?`;
    const dialogRef = this.dialog.open(SuccessfulModalComponent, {
      data: message
    });
    dialogRef.afterClosed().subscribe(data => {
      //console.log(data);
    });
  }
  goBack() {
    this.router.navigate(['/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Sector-Misalignment/WO-Sector-Misalignment'])
  }
}
