import { Component, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';
import { ViewTasksComponent } from '../web-performance-test/view-tasks/view-tasks.component';

@Component({
    selector: 'recipe-view-wo-renderer',
    template: `<button  [ngClass]="!showDisabled ? 'hideButton' : 'showButton'" mat-icon-button [matMenuTriggerFor]="reportbuilderEditorMenu" aria-label="Example icon-button with a menu">
            <mat-icon style="line-height: 0;color:black !important;"><span class="zmdi zmdi-more-vert"></span></mat-icon>
        </button>
        <mat-menu #reportbuilderEditorMenu="matMenu" class="reportbuilder-editor-menu-render" xPosition="before">
            <button mat-menu-item (click)="deleteWorkorder($event)">
                <span>Delete</span>
            </button>
            <button mat-menu-item (click)="downloadWorkorder($event)">
                <span>Download</span>
            </button>
        </mat-menu>`,
    styles: [
        `
        .reportbuilder-editor-menu-render .mat-menu-content .mat-menu-item {
            width: 160px !important;
            height: 48px !important;
            line-height: 1 !important;
        }
        .reportbuilder-editor-menu-render .mat-menu-content .mat-menu-item:hover {
            background-color: #f3f7fc;
        }
        .hideButton {
            display: none;
        }
        .showButton {
            display: block;
        }
    `
    ],
    encapsulation: ViewEncapsulation.None
})

export class RecipeViewWORendererComponent implements ICellRendererAngularComp {
    params;
    enabled: Boolean;
    dataTest: any = false;
    showDisabled: boolean =  false;

    constructor(
        public dialog: MatDialog,
        public datashare: DataSharingService,
        public router: Router
    ) { }

    agInit(params): void {
        if(params.data.status != 'In Progress') {
            this.showDisabled =  true;
        } else {
            this.showDisabled = false;
        }
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

    deleteWorkorder(evt) {
        const message = `Are you sure you want to Close this WorkOrder?`;
        const image = 'warning';
        const snackbarMode = 'success';
        const snackbarText = 'Workorder is Deleted Successfully';
        const dialogData = new CommonDialogModel("Warning!", message, image, snackbarMode, snackbarText);
        this.dialog.open(CommonPopupComponent, {
          data: dialogData
        });
    }

    downloadWorkorder(evt) {
        this.router.navigate(["/JCP/Work-Orders/NV-Workorders/Recipe-Workorders/Copy-To-New-Workorder"])
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