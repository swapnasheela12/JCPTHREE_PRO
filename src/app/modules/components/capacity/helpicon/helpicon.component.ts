//import { Component, OnInit } from '@angular/core';
import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid';

import { MatDialog } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { GridOptions, GridCore, SelectionChangedEvent, GridApi } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from "@angular/material/dialog";
import { QuestionPopupComponent } from '../question-popup/question-popup.component'

@Component({
  selector: 'app-helpicon',
  templateUrl: './helpicon.component.html',
  styleUrls: ['./helpicon.component.scss']
})
export class HelpiconComponent implements ICellRendererAngularComp {

  constructor(public dialog: MatDialog, public matDialog: MatDialog) { }

  ngOnInit(): void {
  }
  params;
  public kpis;
  public showGlobalOperation: Boolean = false;

  refresh(params?: any): boolean {
    return true;
  }


 
  agInit(params): void {
    this.params = params;
    this.kpis = this.params.data.kpis === "Average RRC Connected Users" || this.params.data.kpis === "AirMAC Cell DL Traffic (GB)" || this.params.data.kpis === "IP Throughput (Mbps)" 

    };
    
    openDialoghelp(): void {
      const dialogRef = this.dialog.open(QuestionPopupComponent, {
        width: "550px",
        panelClass: "material-dialog-container",
       
      });
  
    
    };
  }
