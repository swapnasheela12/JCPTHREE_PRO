import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';
import { Component, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'edit-renderer',
  template: `
  <mat-icon style="line-height: 0; font-size: 15px;color: rgba(0,0,0,0.54);" (click)="editRow()">
  <span class="ic ic-pencil"></span>
  </mat-icon>
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

export class EditRendererComponent implements ICellRendererAngularComp {
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

  editRow(): void {
    this.dialog.open(EditComponent, {
      width: '32vw',
      height: '33vh'
    });
  }
}