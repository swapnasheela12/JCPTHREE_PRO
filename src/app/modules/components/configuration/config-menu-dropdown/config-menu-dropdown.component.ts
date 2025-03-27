import { Component, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {  MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import{HistoryPopupComponent} from '../history-popup/history-popup.component'
import { HttpClient } from '@angular/common/http';
import{InfoPopupComponent} from '../info-popup/info-popup.component'


@Component({
  selector: 'app-config-menu-dropdown',
  template: `<button mat-icon-button [matMenuTriggerFor]="configmenu" aria-label="Example icon-button with a menu">
  <mat-icon style="line-height: 0;color:black !important;"><span class="zmdi zmdi-more-vert"></span></mat-icon>
</button>
<mat-menu #configmenu="matMenu" class="config-menu-render" xPosition="before">
  <button mat-menu-item>
      <span>Edit</span>
  </button>
  <button mat-menu-item>
      <span>Clone</span>
  </button>
  <button mat-menu-item>
      <span>Share</span>
  </button>
  <button mat-menu-item (click)="openWarningDialog()">
      <span>Delete</span>
  </button>
</mat-menu>`,
  styles: ['./config-menu-dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigMenuDropdownComponent implements ICellRendererAngularComp {


 
  params;
  enabled: Boolean;
  dataTest: any = false;
  dialogref: any;

  constructor(
    public dialog: MatDialog,
    public datashare: DataSharingService,
    private http: HttpClient, 
  ) {
  }
  ngOnInit(): void {
  }
  agInit(params): void {
    this.params = params;
    this.datashare.checkboxMessage.subscribe((checkbox) => {
      this.dataTest = checkbox;
    });
  }

  refresh(params?: any): boolean {
    return true;
  }

  openDialogHistory(): void {
    const dialogRef = this.dialogref.open(HistoryPopupComponent, {
      width: "850px",
      panelClass: "material-dialog-container",
      
    });

  
  };

  close() {
    this.dialogref.close();
  }
  openDialogInfo(): void {
    const dialogRef = this.dialogref.open(InfoPopupComponent, {
      width: "500px",
      panelClass: "material-dialog-container",
   
    });

   

  };
}
