import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { GridOptions, GridCore, SelectionChangedEvent, GridApi } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { DataSharingService } from 'src/app/_services/data-sharing.service';





@Component({
  selector: 'app-history-popup',
  templateUrl: './history-popup.component.html',
  styleUrls: ['./history-popup.component.scss']
})
export class HistoryPopupComponent implements OnInit {
  gridOptions: GridOptions;
  
  historyRowdata: any;
  historyColumndata: { headerName: string; field: string; width: number; }[];

  constructor(public matDialog: MatDialog, 
    public matselect: MatSelectModule, 
    public datashare: DataSharingService,
    private http: HttpClient, 
    public dialogRef: MatDialogRef<HistoryPopupComponent>
  ) {

    this.gridOptions = <GridOptions>{};
    this.createHistoryColumnData();
    this.getHistoryData();
  }
  ngOnInit(): void {
  }
  openDialogHistory(): void {
    const dialogRef = this.matDialog.open(HistoryPopupComponent, {
      width: "850px",
      panelClass: "material-dialog-container",
      //data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {

    //  this.animal = result;
    });

  };

  close() {
    this.dialogRef.close();
  }

// setup the grid after the page has finished loading
private createHistoryColumnData() {
  this.historyColumndata = [
    {
      headerName: "Date & Time",
      field: "dateandtime",
      width: 160,
    }, {
      headerName: "Requester Email ID",
      field: "requesteremailid",
      width: 220
    }, {
      headerName: "Actual",
      field: "actual",
      width: 150
    },

    {
      headerName: "Updated Value",
      field: "updatedvalue",
      width: 220
    }, {
      headerName: "JCP Workorder ID",
      field: 'jcpworkorderid',
      width: 220
    },
    {
      headerName: "Implementation Comments",
      field: 'implementationcomments',
      width: 260
    },
   

  ];
}
private getHistoryData() {
  this.http.get("assets/data/layers/popup-data/history-popup-data.json")
    .subscribe(data => {
      this.historyRowdata = data;
  });
}

}
