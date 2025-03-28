import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';
import { Component, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { EditComponent } from './edit/edit.component';


@Component({
  selector: 'threedot-active-library-renderer',
  template: `<button mat-icon-button *ngIf="params.data.milestone != ''" [matMenuTriggerFor]="reportbuilderEditorMenu" aria-label="Example icon-button with a menu">
            <mat-icon style="line-height: 0;color:black !important;"><span class="zmdi zmdi-more-vert"></span></mat-icon>
        </button>
        <mat-menu #reportbuilderEditorMenu="matMenu" class="reportbuilder-editor-menu-render" xPosition="before">
            <button mat-menu-item (click)="editActiveLibrary()">
                <span>Edit</span>
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

export class threeDotActiveLibraryRendererComponent implements ICellRendererAngularComp {
  params;
  enabled: Boolean;
  dataTest: any = false;

  constructor(
    public dialog: MatDialog,
    public datashare: DataSharingService
  ) { }

  agInit(params): void {
    this.params = params;
    console.log("p2b",this.params)
    this.datashare.checkboxMessage.subscribe((checkbox) => {
      this.dataTest = checkbox;
    });
  }

  editActiveLibrary() {
    this.dialog.open(EditComponent,{
      height: "405px",
      width: "840px",
      panelClass: "material-dialog-container",
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