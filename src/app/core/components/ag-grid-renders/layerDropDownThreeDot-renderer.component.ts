import { Inject } from '@angular/core';
import { CustomFlagPopupComponent } from './../commonPopup/custom-flag-popup/custom-flag-popup.component';
import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';
import { Component, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';


@Component({
  selector: 'layerDropDownDot-button-renderer',
  template: `<button mat-icon-button [matMenuTriggerFor]="layerDropDownDotMenu" aria-label="Example icon-button with a menu">
            <mat-icon style="line-height: 0;color:black !important;"><span class="zmdi zmdi-more-vert"></span></mat-icon>
        </button>
        <mat-menu #layerDropDownDotMenu="matMenu" class="reportbuilder-editor-menu-render" xPosition="before">
            <button mat-menu-item>
                <span>Edit</span>
            </button>
            <button mat-menu-item>
                <span>View</span>
            </button>
            <button mat-menu-item (click)="cellClickedDetails($event)">
                <span>Flag</span>
            </button>
            <!-- <button mat-menu-item (click)="openWarningDialog()">
                <span>Delete</span>
            </button> -->
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

export class layerlayerDropDownDotRendererComponent implements ICellRendererAngularComp {
  params;
  enabled: Boolean;
  dataTest: any = false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CustomFlagPopupComponent>,@Inject(MAT_DIALOG_DATA) public datatype:any,
    public datashare: DataSharingService
  ) { }

  agInit(params): void {
    this.params = params;
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

  cellClickedDetails(evt) {
    console.log(evt,"evt");

    this.dialogRef.close();
    const dialogRef = this.dialog.open(CustomFlagPopupComponent, {
      width: "535px",
      height: "475px",
      panelClass: "material-dialog-container",
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
    
  }

}