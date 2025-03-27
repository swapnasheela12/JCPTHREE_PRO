import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';

@Component({
  selector: 'app-button-renderer',
  template: `
   <button mat-icon-button [matMenuTriggerFor]="aggridMenu" aria-label="Example icon-button with a menu">
  <mat-icon style="line-height: 0;color:black !important;"><span class="zmdi zmdi-more-vert"></span></mat-icon>
</button>
<mat-menu #aggridMenu="matMenu" class="aggridMenuPanelRender">
  <button mat-menu-item>
    <!-- <div class="pr-3 fas fa-trash-alt"></div> -->
    <span>Edit</span>
  </button>
  <button mat-menu-item (click)="openWarningDialog()">
    <!-- <div class="pr-3 fas fa-trash-alt"></div> -->
    <span>Delete</span>
  </button>
  <button mat-menu-item>
    <!-- <div class="pr-3 fas fa-download"></div> -->
    <span>Download</span>
  </button>
</mat-menu>
    `
})

export class dropDownList3DotRendererComponent implements ICellRendererAngularComp {

  params;
  label: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data
      }
      this.params.onClick(params);

    }
  }

  constructor(public dialog: MatDialog, public datashare: DataSharingService) { }


  openWarningDialog(){
    const message = `Are you Sure you want to perform this action?`;
    const image = 'warning';
    const snackbarMode = 'success';
    const snackbarText = 'Action Performed Successfully';
    const dialogData = new CommonDialogModel("Warning!", message, image, snackbarMode, snackbarText);
    this.dialog.open(CommonPopupComponent, {
      data: dialogData
    });
  }

  deleteRow(evt) {
    let deletedRow = this.params.node.data;
    this.params.api.updateRowData({ remove: [deletedRow] });
  }




}