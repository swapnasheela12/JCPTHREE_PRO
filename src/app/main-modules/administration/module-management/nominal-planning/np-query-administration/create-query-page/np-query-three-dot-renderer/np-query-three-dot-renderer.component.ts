import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';

@Component({
  selector: 'app-np-query-three-dot-renderer',
  template: `
  <div>
        <button mat-icon-button [matMenuTriggerFor]="kpiEditorMenu" aria-label="Example icon-button with a menu">
            <mat-icon style="line-height: 0;color:black !important;"><span class="zmdi zmdi-more-vert"></span></mat-icon>
        </button>
        <mat-menu #kpiEditorMenu="matMenu" class="kpi-editor-menu-render" xPosition="before">
            <button mat-menu-item>
                <span>Edit</span>
            </button>
            <button mat-menu-item>
                <span>Clone</span>
            </button>
            <button mat-menu-item (click)="openWarningDialog()">
                <span>Delete</span>
            </button>
        </mat-menu>
    </div>
    `,
    styles: [
        `
        .kpi-editor-menu-render .mat-menu-content .mat-menu-item:hover {
            background-color: #f3f7fc;
        }
    `
    ],
    encapsulation: ViewEncapsulation.None
})
export class NpQueryThreeDotRendererComponent implements ICellRendererAngularComp {

  params;
  enabled: Boolean;
  dataTest : any = false;

  constructor(
    public dialog: MatDialog,
    public datashare: DataSharingService
  ) {
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

  openWarningDialog():void {
    const message = `Are you Sure you want to perform this action?`;
    const image = 'warning';
    const snackbarMode = 'success';
    const snackbarText = 'Action Performed Successfully';
    const dialogData = new CommonDialogModel("Warning!", message, image, snackbarMode, snackbarText);
    const dialogRef = this.dialog.open(CommonPopupComponent, {
      data: dialogData
    });
  }

}
