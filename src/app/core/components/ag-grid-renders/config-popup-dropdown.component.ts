// import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commanPopup/common-popup/common-popup.component';
// import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
// import { ICellRendererAngularComp } from 'ag-grid-angular';
// import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid';
// // import { CommonPopupComponent, CommonDialogModel } from '../../../../../core/components/commanPopup/common-popup/common-popup.component';
// import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
// import { DataSharingService } from 'src/app/_services/data-sharing.service';
// import{HistoryPopupComponent} from '../../../modules/components/configuration/history-popup/history-popup.component'
// import { GridOptions, GridCore, SelectionChangedEvent, GridApi } from 'ag-grid-community';
// import { HttpClient } from '@angular/common/http';
// import { MatSelectModule } from "@angular/material/select";
// import{InfoPopupComponent} from '../../../modules/components/configuration/info-popup/info-popup.component'


// @Component({
//   selector: 'app-config-popup-dropdown',
//   template: `<button mat-icon-button [matMenuTriggerFor]="configMenu" aria-label="Example icon-button with a menu">
//   <mat-icon style="line-height: 0;color:black !important;"><span class="zmdi zmdi-more-vert"></span></mat-icon>
// </button>
// <mat-menu #configMenu="matMenu" class="config-menu-render" xPosition="before">
//   <button mat-menu-item>
//       <span class="" (click)="openDialogHistory()">History</span>
//   </button>
//   <button mat-menu-item>
//       <span (click)="openDialogInfo()">Info</span>
//   </button>
 
// </mat-menu>`,
//   styles: [` .icon-button {
//     float: right;
//     padding: 10px 11px;
//     text-align: center;
//     width: 50px !important;
//     height: 50px !important;
//     border-radius: 25px;
//     background: none;

// }

// .zmdi-help {
//     font-size: 20px;
//     color:#777777;
// }` ],
// encapsulation: ViewEncapsulation.None

// })
// export class ConfigPopupDropdownComponent implements ICellRendererAngularComp {
//   dialogref: any;
//   constructor(
//     public dialog: MatDialog,
//     public datashare: DataSharingService,
//     private http: HttpClient, 
//   ) {
//   }

//   ngOnInit(): void {
//   }
//   params;
//   enabled: Boolean;
//   dataTest: any = false;

  

//   agInit(params): void {
//     this.params = params;
//     this.datashare.checkboxMessage.subscribe((checkbox) => {
//       this.dataTest = checkbox;
//     });
//   }

//   refresh(params?: any): boolean {
//     return true;
//   }

//   openDialogHistory(): void {
//     const dialogRef = this.dialogref.open(HistoryPopupComponent, {
//       width: "850px",
//       panelClass: "material-dialog-container",
      
//     });

  
//   };

//   close() {
//     this.dialogref.close();
//   }
//   openDialogInfo(): void {
//     const dialogRef = this.dialogref.open(InfoPopupComponent, {
//       width: "500px",
//       panelClass: "material-dialog-container",
   
//     });

   

//   };

// }
