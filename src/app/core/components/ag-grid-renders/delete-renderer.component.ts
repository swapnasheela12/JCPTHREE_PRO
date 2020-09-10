import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commanPopup/common-popup/common-popup.component';
import { Component, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';


@Component({
  selector: 'delete-renderer',
  template: `
  <mat-icon style="line-height: 0; font-size: 15px;color: rgba(0,0,0,0.54);" (click)="deleteRow($event)">
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
    this.params.api.updateRowData({ remove: [deletedRow] })
  }
}