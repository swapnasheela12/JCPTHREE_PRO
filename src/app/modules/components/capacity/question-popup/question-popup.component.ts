
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
public questionColumns;
public questionRow;



url_1 = "assets/data/layers/popup-data/help-popup-data.json";

  constructor(private datatable: TableAgGridService, 
 dialog: MatDialog, 
    public matDialog: MatDialog, 
    private http: HttpClient,  
    public dialogRef: MatDialogRef<QuestionPopupComponent>) { 

    this.createQuestionColumn();
  
    this.httpClientRowData();
  }

  ngOnInit(): void {
  }
  
  private createQuestionColumn() {
    this.questionColumns = [
      {
        headerName: "Band(MHz)",

        field: "band",
        width: 140,
        cellClass: 'lock-pinned'
      }, {
        headerName: "Bandwidth(MHz)",

        field: 'bandwidth',
        width: 160,
        cellClass: 'lock-pinned',
      }, 
      {
        headerName: "Average RRC Connected Users",

        field: 'averageusers',
        width: 400,
        cellClass: 'lock-pinned'
      }
    ];
  }
  // private getHelpData() {
  //   this.http.get("assets/data/layers/popup-data/help-popup-data.json")
  //     .subscribe(data => {
  //       this.questionRow = data;
  //   });
  // }
  private httpClientRowData() {
    this.http
      .get("assets/data/layers/popup-data/help-popup-data.json")
      .subscribe(data => {
        this.questionRow = data;
        this.datatable.rowDataURLServices = this.url_1;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid";
        this.datatable.rowDataServices = this.questionRow;
        this.datatable.gridPinnedServices = this.gridPinned;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });
this.defaultColDef = this.columnDefs;
}
//defaultColDef: any = { resizable: true };

close() {
  this.dialogRef.close();

}

}
