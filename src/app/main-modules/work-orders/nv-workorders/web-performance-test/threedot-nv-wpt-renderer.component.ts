import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';
import { Component, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'threeDot-nv-wpt-button-renderer',
    template: `<button mat-icon-button [matMenuTriggerFor]="reportbuilderEditorMenu" aria-label="Example icon-button with a menu">
            <mat-icon style="line-height: 0;color:black !important;"><span class="zmdi zmdi-more-vert"></span></mat-icon>
        </button>
        <mat-menu #reportbuilderEditorMenu="matMenu" class="reportbuilder-editor-menu-render" xPosition="before">
            <button mat-menu-item (click)="editRow($event)">
                <span>Edit</span>
            </button>
            <button mat-menu-item (click)="deleteRow($event)">
                <span>Delete</span>
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
    `
    ],
    encapsulation: ViewEncapsulation.None
})

export class ThreeDotNVWPTRenderer implements ICellRendererAngularComp {
    params;
    disableButtons: any;
    enabled: Boolean;
    dataTest: any = false;

    constructor(public dialog: MatDialog, public datashare: DataSharingService,
        private _snackBar: MatSnackBar) { }

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
        console.log("deelete row")
        let deletedRow = this.params.node.data;
        this.params.api.updateRowData({ remove: [deletedRow] });
        this._snackBar.open("Success: Deleted Successfully", "", {
            duration: 2000,
            panelClass: 'snack_bar'
          });


    }

    editRow(evt) {
        this.datashare.changeMessage({ type: "edit" });
    }
}