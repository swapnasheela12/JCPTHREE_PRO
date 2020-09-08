
//import { Component, OnInit } from '@angular/core';
import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid';

import { MatDialog } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { GridOptions, GridCore, SelectionChangedEvent, GridApi } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from "@angular/material/dialog";
import { from } from 'rxjs';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { MultipleTableAgGridService } from 'src/app/core/components/multiple-table-ag-grid/multiple-table-ag-grid.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-question-popup',
  templateUrl: './question-popup.component.html',
  styleUrls: ['./question-popup.component.scss']
})
export class QuestionPopupComponent implements OnInit {

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


  constructor(private datatable: TableAgGridService, private datashare: DataSharingService, private router: Router,
    private httpClient: HttpClient, dialog: MatDialog,
    public matDialog: MatDialog,
    public dialogRef: MatDialogRef<QuestionPopupComponent>) {
    router.events.subscribe((url: any) => { });
    this.gridOptions = <GridOptions>{};
    this.createColumnDefs();

    // this.datashare.currentMessage.subscribe((message) => {
    //   this.sidenavBarStatus = message;
    // });

    this.httpClient.get("assets/data/layers/popup-data/help-popup-data.json")
      .subscribe(data => {
        this.rowData = data;
        // this.datatable.rowDataURLServices = "assets/data/layers/popup-data/help-popup-data.json";
        // this.datatable.typeOfAgGridTable = "Default-Ag-Grid";
        // this.datatable.rowDataServices = this.rowData;
        // this.datatable.gridOptionsServices = this.gridOptions;
        // this.datatable.defaultColDefServices = this.defaultColDef;
      });
  }

  ngOnInit(): void {
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
    //this.datatable.columnDefsServices = this.columnDefs;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  close() {
    this.dialogRef.close();
  }

}
