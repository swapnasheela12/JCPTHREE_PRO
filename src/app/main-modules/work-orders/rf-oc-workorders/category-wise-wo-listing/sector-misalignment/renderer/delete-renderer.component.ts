import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commanPopup/common-popup/common-popup.component';
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid';
// import { CommonPopupComponent, CommonDialogModel } from '../../../../../core/components/commanPopup/common-popup/common-popup.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';


@Component({
  selector: 'delete-button-renderer',
  template: `<button mat-icon-button>
            <mat-icon style="line-height: 0;color:black !important;"><span class="pr-3 fas fa-trash-alt"></span></mat-icon>
        </button>
        `,
  encapsulation: ViewEncapsulation.None
})

export class DeleteRendererComponent implements ICellRendererAngularComp {
  params;
  enabled: Boolean;
  dataTest: any = false;

  constructor(
    public dialog: MatDialog,
    public datashare: DataSharingService
  ) {
  }

  agInit(params): void {
    this.params = params;

  }

  refresh(params?: any): boolean {
    return true;
  }

  // openWarningDialog(): void {
  //   const message = `Are you Sure you want to perform this action?`;
  //   const image = 'warning';
  //   const snackbarMode = 'success';
  //   const snackbarText = 'Action Performed Successfully';
  //   const dialogData = new CommonDialogModel("Warning!", message, image, snackbarMode, snackbarText);
  //   const dialogRef = this.dialog.open(CommonPopupComponent, {
  //     data: dialogData
  //   });
  // }

}