import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';
import { Component, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { AlarmHistoryComponent } from './alarm-history/alarm-history.component';
import { InformationComponent } from './information/information.component';


@Component({
  selector: 'threedot-active-alarm-renderer',
  template: `<button mat-icon-button *ngIf="params.data.milestone != ''" [matMenuTriggerFor]="reportbuilderEditorMenu" aria-label="Example icon-button with a menu">
            <mat-icon style="line-height: 0;color:black !important;"><span class="zmdi zmdi-more-vert"></span></mat-icon>
        </button>
        <mat-menu #reportbuilderEditorMenu="matMenu" class="reportbuilder-editor-menu-render" xPosition="before">
            <button mat-menu-item (click)="openInformation()">
                <span>Information</span>
            </button>
            <button mat-menu-item (click)="openAlarmHistory()">
                <span>Alarm History</span>
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

export class threeDotActiveAlarmRendererComponent implements ICellRendererAngularComp {
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

  refresh(): boolean {
    return true;
  }

  openInformation() {
    this.dialog.open(InformationComponent,{
      height: "600px",
      width: "840px",
      panelClass: "material-dialog-container",
    });
  }

  openAlarmHistory() {
    this.dialog.open(AlarmHistoryComponent,{
      height: "420px",
      width: "80vw",
      maxWidth: "80vw",
      panelClass: "material-dialog-container",
    });
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