import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GridOptions, GridCore } from '@ag-grid-community/all-modules';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { TaskInputRendererComponent } from '../../renderer/task-input-renderer.component';
import { TaskDropdownRendererComponent } from '../../renderer/task-dropdown-renderer.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRendererComponent } from 'src/app/core/components/ag-grid-renders/delete-renderer.component';
import { SuccessfulModalComponent } from 'src/app/core/components/commanPopup/successful-modal/successful-modal.component';
import { IExec_Task, IExec_Site, IExec_Impl, IExec_Impl_Ian, ILabelValue, IExec_Task_Closure_Remark } from '../../../../Irf-oc';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-execution-task',
  templateUrl: './execution-task.component.html',
  styleUrls: ['./execution-task.component.scss']
})
export class ExecutionTaskComponent implements OnDestroy {
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  public sidenavBarStatus: boolean;
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public gridOptionsImpl: GridOptions;
  public gridOptionsSite: GridOptions;
  public gridOptionsImplIan: GridOptions;
  public columnDefs: any;
  public rowCount: string;
  public formControlPageCount = new FormControl();
  public showGlobalOperation: Boolean = false;
  public taskColDef: Array<{}>;
  public siteColDef: Array<{}>;
  public implColDef: Array<{}>;
  public implColDefIan: Array<{}>;
  public taskRowdata: Array<IExec_Task>;
  public ianLead: boolean = false;
  public execLead: boolean = true;
  public siteRowdata: Array<IExec_Site> = [
    {
      "siteParameter": "Antenna Azimuth(deg)",
      "currentValue": "67"
    },
    {
      "siteParameter": "Antenna M-Tilt(deg)",
      "currentValue": "7.5"
    },
    {
      "siteParameter": "Antenna Height(m)",
      "currentValue": "30"
    },
    {
      "siteParameter": "E-Tilt(deg)",
      "currentValue": "4"
    }
  ];
  public implRowdata: Array<IExec_Impl> = [
    {
      "sector": "",
      "band": "",
      "newAzimuthValue": ""
    },
    {
      "sector": "",
      "band": "",
      "newAzimuthValue": ""
    },
  ];
  public destroySubscription: Subscription = new Subscription();


  public implRowdataIAN: Array<IExec_Impl_Ian> = [
    {
      "sector": "Alpha",
      "band": "2300",
      "newAzimuthValue": "1600"
    }
  ];
  public frameworkComponentsTaskExecution;
  taskClosureRemark: Array<IExec_Task_Closure_Remark> = [
    { value: 'taskClosure', name: 'Task Closure' },
    { value: 'databaseMismatch', name: 'Database Mismatch' },
    { value: 'siteAccessIssue', name: 'Site Access Issue' },
    { value: 'spaceConstraint', name: 'Space Constraint' },
    { value: 'materialRequired', name: 'Material Required' },
    { value: 'requiredClutter', name: 'Required based on clutter' },
    { value: 'implementationDone', name: 'Implementation Done' }
  ];

  siteDetails: Array<ILabelValue> = [
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
    },
    {
      "label": "Antenna Make:",
      "value": "S-Wave 18/18/23/23-65-18DV10C-F - TYPE1 (MULTIBAND)"
    },
    {
      "label": "Antenna Model:",
      "value": "4T4R"
    }
  ];

  observedIssues: Array<ILabelValue> = [
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

  fieldMeasurementInformation: Array<ILabelValue> = [
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
  ]
  uploadedImg = [];
  showFileUploadwidget: boolean = false;
  taskClosureRemarks = ["DataMismatch", "Site Access Issue", "Space Constraints", "Material Required", "Required based on cluuter", "Implementation done"]


  public task_url: string = "assets/data/report/sector-misalignment/execution-task/execution-task.json";
  public site_url: string = "assets/data/report/sector-misalignment/execution-task/implementation-details.json";
  public impl_url: string = "assets/data/report/sector-misalignment/execution-task/site-parameter.json";

  onReadyModeUpdate(params) {
    this.calculateRowCount();
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.calculateRowCount();
  }
  public calculateRowCount() {
    if (this.gridOptions.api && this.gridOptionsImpl.api && this.gridOptionsSite.api &&
      this.taskRowdata && this.siteRowdata && this.implRowdata) {
      setTimeout(() => {
        this.gridOptions.api.sizeColumnsToFit();

        if (this.ianLead) {
          this.gridOptionsImplIan.api.sizeColumnsToFit();
        } else {
          this.gridOptionsImpl.api.sizeColumnsToFit();
        }
        this.gridOptionsSite.api.sizeColumnsToFit();
      }, 1000);
    }
  }

  constructor(private datashare: DataSharingService, private router: Router,
    private httpClient: HttpClient, public dialog: MatDialog) {
    router.events.subscribe();
    this.frameworkComponentsTaskExecution = {
      'dropdownRenderer': TaskDropdownRendererComponent,
      'inputRenderer': TaskInputRendererComponent,
      'deleteRenderer': DeleteRendererComponent
    };
    this.gridOptions = <GridOptions>{};
    this.gridOptionsImpl = <GridOptions>{};
    this.gridOptionsImplIan = <GridOptions>{};
    this.gridOptionsSite = <GridOptions>{};
    this.taskColDef = this.createColumnDefs();
    this.siteColDef = this.createSiteColumnDefs();
    this.implColDef = this.createImplColumnDefs();
    this.implColDefIan = this.createImplColumnDefsIan();

    this.destroySubscription = this.datashare.currentMessage.subscribe((message: boolean) => {
      this.sidenavBarStatus = message;
      this.calculateRowCount();
    });

    this.httpClient.get(this.task_url)
      .subscribe((data: Array<IExec_Task>) => {
        this.taskRowdata = data;
      });
  }

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
        headerName: "Sector*",
        field: "sector",
        width: 150,
        cellRenderer: 'dropdownRenderer'
      },
      {
        headerName: "Band*",
        field: "band",
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
        cellRenderer: 'deleteRenderer'
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
    if (this.ianLead) {
      this.gridOptionsImplIan.api.setQuickFilter(value);
    } else {
      this.gridOptionsImpl.api.setQuickFilter(value);
    }

    this.gridOptionsSite.api.setQuickFilter(value);
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
    this.dialog.open(SuccessfulModalComponent, {
      data: message
    });
  }

  goBack() {
    this.router.navigate(['/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Sector-Misalignment/WO-Sector-Misalignment'])
  }

  ngOnDestroy() {
    this.destroySubscription.unsubscribe();
  }
}
