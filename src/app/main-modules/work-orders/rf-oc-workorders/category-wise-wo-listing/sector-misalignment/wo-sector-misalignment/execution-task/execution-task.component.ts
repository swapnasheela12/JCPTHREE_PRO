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
import { TaskInputRendererComponent } from '../../renderer/task-input-renderer.component';
import { DeleteRendererComponent } from '../../renderer/delete-renderer.component';
import { TaskDropdownRendererComponent } from '../../renderer/task-dropdown-renderer.component';

@Component({
  selector: 'app-execution-task',
  templateUrl: './execution-task.component.html',
  styleUrls: ['./execution-task.component.scss']
})
export class ExecutionTaskComponent implements OnInit {
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
  public rowData: any;
  public columnDefs: any;
  public rowCount: string;
  public formControlPageCount = new FormControl();
  public showGlobalOperation: Boolean = false;
  public taskColDef;
  public siteColDef;
  public implColDef;
  public taskRowdata;
  public siteRowdata = [
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
  public implRowdata = [
    {
      "sector": "",
      "band": "",
      "newAzimuthValue": ""
    }
  ];
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
    },
  ];

  siteDetail = [
    {
      "label": "Antenna Make:",
      "value": "S-Wave 18/18/23/23-65-18DV10C-F - TYPE1 (MULTIBAND)"
    },
    {
      "label": "Antenna Model:",
      "value": "4T4R"
    }
  ]

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
    console.log(this.gridOptions, "this.gridoptions");
    console.log(params, "onReady");
    this.gridApi = params.api;
    this.calculateRowCount();
  }
  public calculateRowCount() {
    console.log("this.gridoptions", this.gridOptions);
    if (this.gridOptions.api && this.taskRowdata && this.siteRowdata && this.implRowdata) {
      setTimeout(() => {
        this.gridOptions.api.sizeColumnsToFit();
      }, 1000);
    }
  }

  constructor(private datatable: TableAgGridService, private datashare: DataSharingService,
    private router: Router, private overlayContainer: OverlayContainer, private httpClient: HttpClient,
    private fileUploadService: FileUploadService) {
    router.events.subscribe((url: any) => console.log(url));
    this.frameworkComponentsTaskExecution = {
      'dropdownRenderer': TaskDropdownRendererComponent,
      'inputRenderer': TaskInputRendererComponent,
      'deleteRenderer': DeleteRendererComponent
    };
    //this.paths = PATHS;
    this.gridOptions = <GridOptions>{};
    this.taskColDef = this.createColumnDefs();
    this.siteColDef = this.createSiteColumnDefs();
    this.implColDef = this.createImplColumnDefs();

    this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
      console.log("this.side", this.sidenavBarStatus);
      this.calculateRowCount();
    });

    // this.httpClient.get(this.site_url)
    //   .subscribe(data => {
    //     this.siteRowdata = data;
    //     console.log("this.siteRowData", this.siteRowdata)
    //   });

    // this.httpClient.get(this.impl_url)
    //   .subscribe(data => {
    //     this.implRowdata = data;
    //     console.log("impl", this.implRowdata)
    //   });

    this.httpClient.get(this.task_url)
      .subscribe(data => {
        this.taskRowdata = data;
      });
  }

  ngOnInit(): void {
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
    // this.datatable.columnDefsServices = this.columnDefs;
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
        cellRenderer: 'Renderer'
      }
    ]
    //this.datatable.columnDefsServices = this.columnDefs;
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
    // setTimeout(() => {

    // }, 1000);
  }

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
      console.log("this. uploadedImg", this.uploadedImg);
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
    // this.files.forEach(file => {
    //   this.uploadFile(file);
    // });

    this.uploadFile(this.files);
  }

}
