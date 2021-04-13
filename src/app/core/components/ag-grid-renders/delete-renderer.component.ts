import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';
import { Component, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';

@Component({
  selector: 'delete-renderer',
  template: `
  <mat-icon disabled="disableButtons" style="line-height: 0; font-size: 15px;color: rgba(0,0,0,0.54);" (click)="deleteRow($event)">
  <span class="delete-trash-icon ic ic-custom-delete"></span></mat-icon>
  `,
  styles: [
    `
    .delete-trash-icon{
      width: 37px;
      height: 37px;
      color: #666666;
  }
    `
  ],
  encapsulation: ViewEncapsulation.None
})

export class DeleteRendererComponent implements ICellRendererAngularComp {
  params;
  disableButtons:any;
  enabled: Boolean;
  dataTest: any = false;

  constructor(public dialog: MatDialog, public datashare: DataSharingService) { }

  agInit(params): void {
    this.params = params;
  }

  refresh(): boolean {
    return true;
  }

  openWarningDialog(): void {
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

  // onSelectionChanged(event: any){
  //   var selectedRows =  this.agGrid.api.getSelectedRows();
  //   this.disableButtons = selectedRows.length === 0;
  // }



}