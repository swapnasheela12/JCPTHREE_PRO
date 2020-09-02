import { GridOptions, GridCore, GridApi, ColumnApi, } from "@ag-grid-community/all-modules";

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropdownComponent } from '../renderer/wostatus/dropdown.component';
import { TextfieldComponent } from '../renderer/wostatus/textfield.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
// import { GridOptions, GridCore } from '@ag-grid-community/all-modules';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { map } from 'lodash';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MultipleTableAgGridService } from 'src/app/core/components/multiple-table-ag-grid/multiple-table-ag-grid.service';
import { TableAgGridComponent } from 'src/app/core/components/table-ag-grid/table-ag-grid.component';
import { DeleteRendererComponent } from 'src/app/core/components/ag-grid-renders/delete-renderer.component';
import { SubmitWorkordedPopupComponent } from '../submit-workorded-popup.component';
import { AgGridModule, AgGridAngular } from 'ag-grid-angular';

interface sitep {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-overshooting-exe-task',
  templateUrl: './overshooting-exe-task.component.html',
  styleUrls: ['./overshooting-exe-task.component.scss']
})
export class OvershootingExeTaskComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('sugGrid') sugGrid: AgGridAngular;
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;


  public paths;
  public sidenavBarStatus;
  public tableWidth;
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public gridOptionsImpl: GridOptions;
  public gridOptionsSite: GridOptions;
public gridOptionsTaskretrigger: GridOptions;

  public taskColDef;
  public siteColDef;
  public implColDef;
  public implColDefIan;


  public rowData: any;
  public columnDefs: any;
  public rowCount: string;
  public formControlPageCount = new FormControl();
  public showGlobalOperation: Boolean = false;

  public taskRowdata;
  public addRemoveRows;
  //public rowData: any;
  public columnDefswo;
  public rowDatawo;
  //public columnrt;
  public rowExecutionTask;
  public spdetailsColumndata;
  public spdetailsRowdata;
  public frameworkComponentsos;
  impParameterDetailsColumndata;

  public imppdetailsRowdata;
  public imppdetailsColumndata;
  public implnRowdata;
  public physicalParameterColumndata;
  public physicalParameterrowdata;
  public pspRowdata: any;

  public siteRowdata;
public implRowdata;
  gridOptionsImplIan: GridOptions;

  onReadyModeUpdate(params) {
    this.calculateRowCount();
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.calculateRowCount();
  }
  public calculateRowCount() {
    if (this.gridOptionsTaskretrigger.api && this.gridOptionsImpl.api && this.gridOptionsSite.api &&
      this.rowExecutionTask && this.spdetailsRowdata && this.implnRowdata) {
      setTimeout(() => {
        this.gridOptionsTaskretrigger.api.sizeColumnsToFit();
        this.gridOptionsImpl.api.sizeColumnsToFit();
        this.gridOptionsImplIan.api.sizeColumnsToFit();
        this.gridOptionsSite.api.sizeColumnsToFit();
      }, 1000);
    }
  }

  constructor(
    
    private http: HttpClient, 
    private datashare: DataSharingService,
    private router: Router,
    private overlayContainer: OverlayContainer,
    private httpClient: HttpClient,
    private fileUploadService: FileUploadService,
    public dialog: MatDialog) {

      this.gridOptionsTaskretrigger = <GridOptions>{};
      this.gridOptionsImpl = <GridOptions>{};
      this.gridOptionsImplIan = <GridOptions>{};
      this.gridOptionsSite = <GridOptions>{};
      this.taskColDef = this.createColumndata();
      this.siteColDef = this.createspdetailsColumndata();
      this.implColDef = this.createimppdetailsColumndata();
      this.implColDefIan = this.createphysicalParametersColumndata();
  
      this.datashare.currentMessage.subscribe((message) => {
        this.sidenavBarStatus = message;
        this.calculateRowCount();
      });

    this.frameworkComponentsTaskExecution = {
      deleteRenderer: DeleteRendererComponent
    };

  }

  ngOnInit(): void {

    this.gridOptions = <GridOptions>{};
    //this.httpClientRowData();

    this.createColumndata();
    this.createRowdata();
    this.createspdetailsColumndata();
    this.createspdetailsRowdata();
    this.createimppdetailsColumndata();
    this.createImplRowdata();
    this.createphysicalParametersColumndata();
    this.createpspRowdata();
  }





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
  taskClosureRemarks = ["DataMismatch", "Site Access Issue", "Space Constraints", "Material Required", "Required based on cluuter", "Implementation done"]

  private createColumndata() {
    this.columnDefswo = [

      {
        headerName: "Date",
        field: "date",
        width: 400

      }, {
        headerName: "Reason for Reassignmenet",
        field: "reasonforreassignment",
        width: 400

      }, {
        headerName: "Remarks",
        field: "remarks",
        width: 400

      }
    ]
  }
  private createRowdata() {
    this.http.get("assets/data/layers/workorders/execution-task.json")
      .subscribe(data => {
        console.log(data);
        this.rowExecutionTask = data;
      });
  }

  private createspdetailsColumndata() {
    this.spdetailsColumndata = [
      {
        headerName: "Site Paraameter",
        field: "siteparameter",
        width: 700

      },
      {
        headerName: "Current Value",
        field: "currentvalue",
        width: 700

      }
    ]


  }
  private createspdetailsRowdata() {
    this.http.get("assets/data/layers/workorders/site-parameter-data.json")
      .subscribe(data => {
        console.log(data);
        this.spdetailsRowdata = data;
      });
  }

  siteps: sitep[] = [
    { value: 'p-0', viewValue: 'E-Tilt(deg)' },
    { value: 'p-1', viewValue: 'Tx-Atenuation-Port1(db)' },
    { value: 'p-2', viewValue: 'Tx-Atenuation-Port2(db)' }
  ];
  sitepos: sitep[] = [
    { value: 'p-0', viewValue: 'E-Tilt(deg)' },
    { value: 'p-1', viewValue: 'Tx-Atenuation-Port1(db)' },
    { value: 'p-2', viewValue: 'Tx-Atenuation-Port2(db)' },
    { value: 'p-3', viewValue: 'Tx-Atenuation-Port2(db)' }
  ];

  // private createimppdetailsColumndata() {
  //   this.impParameterDetailsColumndata = [
  //     {
  //       headerName: "Site Parameter*",
  //       field: "siteparameter",
  //       width: 400,
  //       cellRendererFramework: DropdownComponent

  //     },
  //     {
  //       headerName: "New Value*",
  //       field: "newvalue",
  //       width: 400,
  //       cellRendererFramework: TextfieldComponent


  //     },
  //     {
  //       headerName: "",
  //       field: "",
  //       width: 300,
  //       template: '<mat-icon style="line-height: 0;color: rgba(0,0,0,0.54);"><span class="delete-trash-icon fas fa-trash-alt"></span></mat-icon>'

  //     }
  //   ]


  // }
  private createimppdetailsColumndata() {
    this.impParameterDetailsColumndata = [
      {
        headerName: "Site Paraameter*",
        field: "siteparameter",
        width: 400,
        cellRendererFramework: DropdownComponent

      },
      {
        headerName: "New Value*",
        field: "newvalue",
        width: 400,
        cellRendererFramework: TextfieldComponent


      },
      {
        headerName: "",
        field: "delete",
        width: 300,
        cellRendererFramework: DeleteRendererComponent

      }
    ]


  }
  onAddRowimp() {
    this.agGrid.api.addItems([{ siteparameter: '', newvalue: '', delete: '' }]);

  }
  onAddRowsug() {
    this.sugGrid.api.addItems([{ siteparameter: '', newvalue: '', delete: '' }]);

  }

  // private createImplRowdata() {
  //   this.http.get("assets/data/layers/workorders/impl-details.json")
  //     .subscribe(data => {
  //       console.log(data);
  //       this.implnRowdata = data;
  //   });
  // }
  private createImplRowdata() {
    this.http.get("assets/data/layers/workorders/impl-details.json")
      .subscribe(data => {
        console.log(data);
        this.implnRowdata = data;
      });
  }




  private createphysicalParametersColumndata() {
    this.physicalParameterColumndata = [
      {
        headerName: "Site Paraameter*",
        field: "siteparameter",
        width: 400,
        cellRendererFramework: DropdownComponent

      },
      {
        headerName: "New Value*",
        field: "newvalue",
        width: 400,
        cellRendererFramework: TextfieldComponent


      },
      {
        headerName: "",
        field: "",
        width: 300,
        cellRendererFramework: DeleteRendererComponent

      }
    ]
  }


  private createpspRowdata() {
    this.http.get("assets/data/layers/workorders/physical-parameter-data.json")
      .subscribe(data => {
        console.log(data);
        this.pspRowdata = data;
      });
  }
 

 
  openSuccessPopup() {
    const dialogRef = this.dialog.open(SubmitWorkordedPopupComponent, {
      width: '700px',
      height: '290px',
      panelClass: 'file-upload-dialog'
    });
    dialogRef.afterClosed().subscribe(data => {
      //console.log(data);
    });
  }
  goBack() {
    this.router.navigate(['/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Overshooting-Cell/WO-Overshooting-Cell'])
  }
}












