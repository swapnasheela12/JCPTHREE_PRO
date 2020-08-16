
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
@Component({
  selector: 'app-question-popup',
  templateUrl: './question-popup.component.html',
  styleUrls: ['./question-popup.component.scss']
})
export class QuestionPopupComponent implements OnInit {
public questionColumns;
public questionRow;
  constructor(public dialog: MatDialog, 
    public matDialog: MatDialog, 
    private http: HttpClient,  
    public dialogRef: MatDialogRef<QuestionPopupComponent>) { 

    this.createQuestionColumn();
  
    this.getHelpData();
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


  private getHelpData() {
    this.http.get("assets/data/layers/popup-data/help-popup-data.json")
      .subscribe(data => {
        console.log(data);
        this.questionRow = data;
    });
  }

  close() {
    this.dialogRef.close();

  }
}
