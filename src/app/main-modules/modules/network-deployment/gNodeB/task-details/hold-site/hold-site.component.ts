import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { inputRendererComponent } from 'src/app/core/components/ag-grid-renders/input-renderer.component';
import { SuccessfulModalComponent } from 'src/app/core/components/commonPopup/successful-modal/successful-modal.component';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';

@Component({
  selector: 'app-hold-site',
  templateUrl: './hold-site.component.html',
  styleUrls: ['./hold-site.component.scss']
})
export class HoldSiteComponent implements OnInit {
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: Array<any>;
  public columnDefs: any[];
  public rowCount: string;
  public defaultColDef = { resizable: true };
  url: string = "assets/data/modules/network_deployment/gNodeB/hold-site.json";
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


  constructor(public dialogRef: MatDialogRef<HoldSiteComponent>,
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
        headerName: "",
        width: 50,
        checkboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        // headerCheckboxSelection: function (params) {
        //   return params.columnApi.getRowGroupColumns().length === 0;
        // },
      },
      {
        headerName: "Task Name",
        field: "taskName",
        width: 250
      },
      {
        headerName: "Task Owner",
        field: "taskOwner",
        width: 200,
      },
      {
        headerName: "Reason",
        field: "reason",
        width: 250,
        cellRenderer: 'inputRenderer',
      }
    ]
    this.datatable.columnDefsServices = this.columnDefs;
  }

  assignTask() {
    this.dialogRef.close();
    // this.datashare.changeMessage("RejectForm");
    const message = {
      message: `Site has been hold successfully during Construction!`,
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

