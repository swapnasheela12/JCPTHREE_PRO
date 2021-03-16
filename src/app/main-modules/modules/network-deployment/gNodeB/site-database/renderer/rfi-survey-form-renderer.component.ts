import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { UploadedFileViewerComponent } from '../../task-details/uploaded-file-viewer/uploaded-file-viewer.component';
import { RfiSurveyFormComponent } from '../rfi-survey-form/rfi-survey-form.component';

@Component({
    selector: 'rfi-survey-renderer',
    template: `
    <button mat-icon-button (click)="openImageSlider()" style="border: 0px;background: transparent; font-size: 24px;">
    <mat-icon style="line-height: 0;color:black !important;"><span class="ic ic-file-pdf"></span></mat-icon>
    </button>
    `
})

export class RfiSurveyFormRendererComponent implements ICellRendererAngularComp {

    params;
    label: string;

    constructor(public dialog: MatDialog) {

    }

    agInit(params): void {
        console.log("ye me hu.. aur yaha image sliding ho raha hai")
        this.params = params;
        this.label = this.params.label || null;
    }

    refresh(params?: any): boolean {
        return true;
    }

    onClick($event) {
        console.log("image slider open")
        if (this.params.onClick instanceof Function) {
            const params = {
                event: $event,
                rowData: this.params.node.data
            }
            this.params.onClick(params);

        }
    }

    openImageSlider() {
        console.log("image slider open")
        this.dialog.open(RfiSurveyFormComponent, {
            //tmax-width: "84vw",
            width: "93vw",
            height: "93vh",
            panelClass: "material-dialog-container",
            //data: this.uploadedImg
        });
    }
}