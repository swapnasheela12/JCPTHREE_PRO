
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions, GridCore } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';


@Component({
  selector: 'app-question-popup',
  templateUrl: './question-popup.component.html',
  styleUrls: ['./question-popup.component.scss']
})
export class QuestionPopupComponent {

  public tableWidth;
  public gridApi;
  public gridPinned = false;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: any;
  public columnDefs: any[];
  public caprowData;
  public sidenavBarStatus;
  public defaultColDef;
  public rowCount: string;
  public gridColumnApi;
  url_1 = "assets/data/layers/popup-data/help-popup-data.json";

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

  constructor(private router: Router, private httpClient: HttpClient,
    public matDialog: MatDialog, public dialogRef: MatDialogRef<QuestionPopupComponent>) {
    router.events.subscribe();
    this.gridOptions = <GridOptions>{};
    this.createColumnDefs();
    this.httpClient.get("assets/data/layers/popup-data/help-popup-data.json")
      .subscribe(data => {
        this.rowData = data;
      });
  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "Band(MHz)",
        field: "band",
        width: 140
      }, {
        headerName: "Bandwidth(MHz)",
        field: 'bandwidth',
        width: 160
      },
      {
        headerName: "Average RRC Connected Users",
        field: 'averageusers',
        width: 200,
      }
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  close() {
    this.dialogRef.close();
  }
}
