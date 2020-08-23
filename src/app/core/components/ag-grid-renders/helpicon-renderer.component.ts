import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commanPopup/common-popup/common-popup.component';
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid';
// import { CommonPopupComponent, CommonDialogModel } from '../../../../../core/components/commanPopup/common-popup/common-popup.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { QuestionPopupComponent } from 'src/app/modules/components/capacity/question-popup/question-popup.component'

@Component({
  selector: 'helpicon-button-renderer',
  template: `<button *ngIf="show" class="helpbtn" routerLink="'/JCP/Row-Rendering'" (click)="openDialoghelp()" 
  class="zmdi zmdi-help" style="color: #808080; font-size: 20px;background: transparent; border: none;"></button>`,
  styles: [
    `
      
        .hideicon {
          display: none;
        }
        .helpbtn {
          border: none;
          background: transparent;

        }
    `
  ],
  encapsulation: ViewEncapsulation.None
})

export class HelpiconRendererComponent implements ICellRendererAngularComp {
  params;
  enabled: Boolean;
  show: boolean = false;
  dataTest: any = false;
kpis;
  constructor(
    public dialog: MatDialog,
    public datashare: DataSharingService
  ) {
  }

  agInit(params): void {
    this.params = params;
   // this.kpis = params;
   if(this.params.data.kpis === "Average RRC Connected Users" || this.params.data.kpis === "AirMAC Cell DL Traffic (GB)" || this.params.data.kpis === "IP Throughput (Mbps)"){
   this.show = !this.show;
   }
  }

  refresh(params?: any): boolean {
    return true;
  }




  openDialoghelp(): void {
    const dialogRef = this.dialog.open(QuestionPopupComponent
      , {
        width: "550px",
        panelClass: "material-dialog-container",
      });
  };



}