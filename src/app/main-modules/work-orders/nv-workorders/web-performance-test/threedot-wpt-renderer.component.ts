import { Component, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';
import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';

@Component({
    selector: 'threeDot-wpt-button-renderer',
    template: `<button mat-icon-button [matMenuTriggerFor]="reportbuilderEditorMenu" aria-label="Example icon-button with a menu" (click)="threedots()">
            <mat-icon style="line-height: 0;color:black !important;"><span class="zmdi zmdi-more-vert"></span></mat-icon>
        </button>
        <mat-menu #reportbuilderEditorMenu="matMenu" class="reportbuilder-editor-menu-render" xPosition="before">
            <button mat-menu-item (click)="viewWorkorder($event)">
                <span>View WorkOrder</span>
            </button>
            <button mat-menu-item (click)="deleteWorkOrder($event)">
                <span>Delete WorkOrder</span>
            </button>
            <button mat-menu-item (click)="copyToNewWorkorder($event)">
                <span>Copy to new Workorder</span>
            </button>
            <button mat-menu-item (click)="viewTask($event)">
                <span>View Tasks</span>
            </button>
        </mat-menu>`,
    styles: [
        `
        .reportbuilder-editor-menu-render .mat-menu-content .mat-menu-item {
            width: 190px !important;
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

export class ThreeDotWPTRenderer implements ICellRendererAngularComp {
    params;
    enabled: Boolean;
    dataTest: any = false;

    constructor(
        public dialog: MatDialog,
        public datashare: DataSharingService,
        public router: Router
    ) { }

    agInit(params): void {
        console.log(params);
        this.params = params;
        this.datashare.checkboxMessage.subscribe((checkbox) => {
            this.dataTest = checkbox;
        });
    }

    refresh(): boolean {
        return true;
    }

    viewWorkorder(evt) {
        this.router.navigate(["/JCP/Work-Orders/NV-Workorders/Web-Performance-Test/View-Workorder"])
    }

    threedots() {
        console.log(this.params)
    }

    deleteWorkOrder(evt) {
        const message = `Are you sure you want to Close this WorkOrder?`;
        const image = 'warning';
        const snackbarMode = 'success';
        const snackbarText = 'Workorder is Deleted Successfully';
        const dialogData = new CommonDialogModel("Warning!", message, image, snackbarMode, snackbarText);
        this.dialog.open(CommonPopupComponent, {
          data: dialogData
        });
    }

    copyToNewWorkorder(evt) {
        this.router.navigate(["/JCP/Work-Orders/NV-Workorders/Web-Performance-Test/Copy-To-New-Workorder"])
    }

    viewTask(evt) {
        this.dialog.open(ViewTasksComponent,{
            width: "750px",
            height: "400px",
            panelClass: "material-dialog-container",
        });
    }

    downloadReport(evt) {

    }

}