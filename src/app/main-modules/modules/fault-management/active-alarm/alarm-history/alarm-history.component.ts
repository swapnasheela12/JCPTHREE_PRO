import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { inputRendererComponent } from 'src/app/core/components/ag-grid-renders/input-renderer.component';
import { SuccessfulModalComponent } from 'src/app/core/components/commonPopup/successful-modal/successful-modal.component';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';

@Component({
  selector: 'app-alarm-history',
  templateUrl: './alarm-history.component.html',
  styleUrls: ['./alarm-history.component.scss']
})
export class AlarmHistoryComponent implements OnInit {
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: Array<any>;
  public columnDefs: any[];
  public rowCount: string;
  public defaultColDef = { resizable: true };
  url: string = "assets/data/modules/fault-management/alarm-history.json";
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


  constructor(public dialogRef: MatDialogRef<AlarmHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialog: MatDialog, private httpClient: HttpClient, private datatable: TableAgGridService) {
    this.createColumnDefs();
    this.httpClient.get(this.url)
      .subscribe((data: Array<any>) => {
        this.rowData = data;
      });
  }

  ngOnInit(): void { }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "Event Start Time",
        field: "startTime",
        width: 230,
        pinned: "left"
      },
      {
        headerName: "Event End Time",
        field: "endTime",
        width: 230,
      },
      {
        headerName: "Alarm Id",
        field: "alarmId",
        width: 150
      },
      {
        headerName: "JCP Classification",
        field: "category",
        width: 240,
      },
      {
        headerName: "Event Type",
        field: "eventType",
        width: 200,
      },
      {
        headerName: "Alarm Description",
        field: "alarmDescription",
        width: 300
      },
      {
        headerName: "Probable Cause",
        field: "probableCause",
        width: 310,
        pinned: "right"
      }
    ];
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

