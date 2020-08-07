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

  taskClosureRemarks = ["DataMismatch", "Site Access Issue", "Space Constraints", "Material Required", "Required based on cluuter", "Implementation done"]


  public url: string = "assets/data/report/sector-misalignment/execution-task/execution-task.json";

  constructor(private datatable: TableAgGridService, private datashare: DataSharingService,
    private router: Router, private overlayContainer: OverlayContainer, private httpClient: HttpClient,
    private fileUploadService: FileUploadService) {
    router.events.subscribe((url: any) => console.log(url));
    //this.paths = PATHS;
    this.gridOptions = <GridOptions>{};
    this.createColumnDefs();

    this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });

    this.httpClient.get(this.url)
      .subscribe(data => {
        this.rowData = data;

        console.log(this.rowData);
        this.datatable.rowDataURLServices = this.url;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid-Report";
        this.datatable.rowDataServices = this.rowData;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
        this.datatable.paginationRequired = false;
        this.datatable.autoPageSizeRequired = false;
      });
  }

  ngOnInit(): void {
  }

  createColumnDefs() {
    // this.columnDefs = {
    //   "task-retrigger": [
    //     {
    //       headerName: "SiteParameter",
    //       field: "SiteParameter"
    //     },
    //     {
    //       headerName: "Reason For Reassignment",
    //       field: "reasonForReassign"
    //     },
    //     {
    //       headerName: "Remarks",
    //       field: "remarks",
    //     }
    //   ],
    //   "site-parameter": [
    //     {
    //       headerName: "SiteParameter",
    //       field: "SiteParameter"
    //     },
    //     {
    //       headerName: "CurrentValue",
    //       field: "CurrentValue",
    //     }
    //   ],
    //   "implemenatation-details": [
    //     {
    //       headerName: "Sector*",
    //       field: "sector",
    //       width: 150,
    //       cellRenderer: this.drp
    //     },
    //     {
    //       headerName: "Band*",
    //       field: "band",
    //       width: 150,
    //       cellRenderer: this.drp
    //     },
    //     {
    //       headerName: "New Azimuth Value(Deg)*",
    //       field: "newAzimuthValue",
    //       width: 150,
    //       cellRenderer: function (params) {
    //         return '<div class="flex"><md-input-container class="md-block margin-bottom-0 hide-md-errors-spacer">' +
    //           '<input value="' + params.value + '" aria-label="NewValue">' +
    //           '</md-input-container></div>';
    //       }
    //     }
    //   ]
    this.columnDefs = [
      {
        headerName: "SiteParameter",
        field: "SiteParameter"
      },
      {
        headerName: "Reason For Reassignment",
        field: "reasonForReassign"
      },
      {
        headerName: "Remarks",
        field: "remarks",
      }
    ]

    this.datatable.columnDefsServices = this.columnDefs;
  }

  drp() {
    return '<div class="flex"><md-input-container class="">' +
      '<md-select ng-model="band.Ian" aria-label="select Band">' +
      '<md-option value="2300" selected>2300</md-option>' +
      '<md-option value="1800" ng-mousedown="alert();">1800</md-option>' +
      '<md-option value="850">850</md-option>' +
      '</md-select>' +
      '</md-input-container></div>';
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
    params.api.paginationGoToPage(4);

  }


  fileName;
  uploadFile(file) {
    this.fileName = file.data.name;
    const formData = new FormData();
    formData.append('file', file.data);
    this.fileUploadService.upload(formData).pipe(
      // map(event: any => {  
      //   switch (event.type) {  
      //     case HttpEventType.Response:  
      //       return event;  
      //   }  
      // }),  
      // catchError((error: HttpErrorResponse) => { 
      //   return of(`${file.data.name} upload failed.`);  
      // })).subscribe((event: any) => {  
      //   if (typeof (event) === 'object') {  
      //   }  
    );
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }
  onClick() {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      const file = fileUpload.files[0];
      this.files.push({ data: file });
      this.uploadFiles();
    };
    fileUpload.click();
  }

}
