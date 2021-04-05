import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';
import { Component, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';


@Component({
  selector: 'dropDownThreeDot-button-renderer',
  template: `<button mat-icon-button [matMenuTriggerFor]="reportbuilderEditorMenu" aria-label="Example icon-button with a menu">
            <mat-icon style="line-height: 0;color:black !important;"><span class="zmdi zmdi-more-vert"></span></mat-icon>
        </button>
        <mat-menu #reportbuilderEditorMenu="matMenu" class="reportbuilder-editor-menu-render" xPosition="before">
            <button mat-menu-item>
                <span>Edit</span>
            </button>
            <button mat-menu-item>
                <span>Clone</span>
            </button>
            <button mat-menu-item>
                <span>Share</span>
            </button>
            <button mat-menu-item *ngIf="enabled == true" (click)="openWarningDialog()">
                <span>Enable</span>
            </button>
            <button mat-menu-item *ngIf="enabled == false" (click)="openWarningDialog()">
              <span>Disable</span>
            </button>
            <button mat-menu-item (click)="openWarningDialog()">
                <span>Delete</span>
            </button>
        </mat-menu>`,
  styles: [
    `
        .reportbuilder-editor-menu-render .mat-menu-content .mat-menu-item {
            width: 125px !important;
            height: 48px !important;
            line-height: 1 !important;
        }
        .reportbuilder-editor-menu-render .mat-menu-content .mat-menu-item:hover {
            background-color: #f3f7fc;
        }
    `
  ],
  encapsulation: ViewEncapsulation.None
})

export class dropDownThreeDotRendererComponent implements ICellRendererAngularComp {
  params;
  enabled;
  dataTest: any = false;

  constructor(
    public dialog: MatDialog,
    public datashare: DataSharingService
  ) { }

  agInit(params): void {
    this.params = params;
    if(this.params.data.status == 'Disabled'){
      this.enabled = true;
    } else if (this.params.data.status == 'Enabled') {
      this.enabled = false;
    }
    this.datashare.checkboxMessage.subscribe((checkbox) => {
      this.dataTest = checkbox;
    });
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

}