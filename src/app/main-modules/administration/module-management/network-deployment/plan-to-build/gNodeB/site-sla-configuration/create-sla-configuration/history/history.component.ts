  import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
  import { HttpClient } from '@angular/common/http';
  import { Component, Inject, OnInit } from '@angular/core';
  import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
  import { Router } from '@angular/router';
  import { inputRendererComponent } from 'src/app/core/components/ag-grid-renders/input-renderer.component';
  import { SuccessfulModalComponent } from 'src/app/core/components/commonPopup/successful-modal/successful-modal.component';
  import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
  
  @Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
  })
  export class HistoryComponent implements OnInit {
    public gridApi;
    public gridColumnApi;
    public gridCore: GridCore;
    public gridOptions: GridOptions;
    public rowData: Array<any>;
    public columnDefs: any[];
    public rowCount: string;
    public defaultColDef = { resizable: true };
    url: string = "assets/data/administration/site-sla-configuration/create-sla/history.json";
    public frameworkComponentsStatus = {
      inputRenderer: inputRendererComponent,
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
  
  
    constructor(public dialogRef: MatDialogRef<HistoryComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialog: MatDialog, private httpClient: HttpClient, private datatable: TableAgGridService) {
      this.createColumnDefs();
      this.httpClient.get(this.url)
        .subscribe((data: Array<any>) => {
          this.rowData = data;
          this.datatable.rowDataURLServices = this.url;
          this.datatable.typeOfAgGridTable = "Default-Ag-Grid-without-Pagination";
          this.datatable.rowDataServices = this.rowData;
          this.datatable.gridOptionsServices = this.gridOptions;
          this.datatable.defaultColDefServices = this.defaultColDef;
        });
    }
  
    ngOnInit(): void { }
  
    private createColumnDefs() {
      this.columnDefs = [
        {
          headerName: "Update Date",
          field: "updateDate",
          width: 180,
          pinned: 'left'
        },
        {
          headerName: "Changed By",
          field: "changedBy",
          width: 200,
          pinned: 'left'
        },
        {
          headerName: "Old Responsible Role",
          field: "oldResponsibleRole",
          width: 250,
        },
        {
          headerName: "New Responsible Role",
          field: "newResponsibleRole",
          width: 250
        },
        {
          headerName: "Old SLA Days",
          field: "oldSLADays",
          width: 150
        },
        {
          headerName: "New SLA Days",
          field: "newSLADays ",
          width: 150
        },
        {
          headerName: "Old SLA Voilation Mail",
          field: "oldSLAVoilationMail",
          width: 150
        },
        {
          headerName: "New SLA Voilation Mail",
          field: "newSLAVoilationMail",
          width: 150
        },
        {
          headerName: "Old Task Assign Mail",
          field: "oldTaskAssignedMail",
          width: 150
        },
        {
          headerName: "New Task Assign Mail",
          field: "newTaskAssignedMail",
          width: 150,
          pinned: 'right'
        },
      ]
      this.datatable.columnDefsServices = this.columnDefs;
    }
  
    assignTask() {
      this.dialogRef.close();
      // this.datashare.changeMessage("RejectForm");
      const message = {
        message: `Task Submitted Successfully!`,
        goToTask: 'ShowMyTask',
        showMyTasks: true
      }
      this.dialog.open(SuccessfulModalComponent, {
        data: message,
      });
    }
  
    cancel() {
      this.dialogRef.close();
    }
  
    closeDialog() {
      this.dialogRef.close();
    }
  }
  
  