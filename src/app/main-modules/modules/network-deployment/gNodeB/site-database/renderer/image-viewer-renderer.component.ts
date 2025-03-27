import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { UploadedFileViewerComponent } from '../../task-details/uploaded-file-viewer/uploaded-file-viewer.component';

@Component({
    selector: 'image-viewer-renderer',
    template: `
   <button mat-icon-button (click)="openImageSlider()">
    <mat-icon style="line-height: 0;color:black !important;"><span class="ic ic-Photos"></span></mat-icon>
    <span style="margin-left: 5px">{{params.value.length}}</span>
    </button>
    `
})

export class ImageViewerRendererComponent implements ICellRendererAngularComp {

    params;
    label: string;

    constructor(public dialog: MatDialog) {

    }

    agInit(params): void {
        this.params = params;
        this.label = this.params.label || null;
    }

    refresh(params?: any): boolean {
        return true;
    }

    onClick($event) {
        if (this.params.onClick instanceof Function) {
            const params = {
                event: $event,
                rowData: this.params.node.data
            }
            this.params.onClick(params);

        }
    }

    openImageSlider() {
        this.dialog.open(UploadedFileViewerComponent, {
            width: "700px",
            height: "450px",
            panelClass: "material-dialog-container",
            //data: this.uploadedImg
        });
    }
}