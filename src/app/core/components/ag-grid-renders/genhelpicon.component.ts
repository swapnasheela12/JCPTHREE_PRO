import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid';

import { MatDialog } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { GridOptions, GridCore, SelectionChangedEvent, GridApi } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from "@angular/material/dialog";
import { QuestionPopupComponent } from '../../../../app/modules/components/capacity/question-popup/question-popup.component'

@Component({
  selector: 'app-genhelpicon',
  template: `<div   class="icon-help icon-button" id="helpicon-render" (click)="openDialoghelp()">
  <div class="zmdi zmdi-help"></div>
</div>`,
  styles: [` .icon-button {
    float: right;
    padding: 10px 11px;
    text-align: center;
    width: 50px !important;
    height: 50px !important;
    border-radius: 25px;
    background: none;

}

.zmdi-help {
    font-size: 20px;
    color:#777777;
}`  ]
})
export class GenhelpiconComponent implements OnInit {

  constructor(public dialog: MatDialog, public matDialog: MatDialog
  ) { }

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
  };

  openDialoghelp(): void {
    // if (this.kpis = this.params.data.kpis === "Average RRC Connected Users" || this.params.data.kpis === "AirMAC Cell DL Traffic (GB)" || this.params.data.kpis === "IP Throughput (Mbps)"
    // ) {
    const dialogRef = this.dialog.open(QuestionPopupComponent, {
      width: "500px",
      height: "350px",
      panelClass: "material-dialog-container",
    });
    // }
  };
}
