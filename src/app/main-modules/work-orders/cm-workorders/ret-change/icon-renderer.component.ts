import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MmlCommandResultComponent } from './cell-details/mml-command-result/mml-command-result.component';

@Component({
    selector: 'app-icon-renderer',
    template: `
   <button mat-icon-button (click)="openMMLCommand($event)">
  <mat-icon style="line-height: 0;color:black !important;"><span class="zmdi zmdi-more-vert"></span></mat-icon>
</button>
    `
})

export class IconRendererComponent implements ICellRendererAngularComp {

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

    openMMLCommand(evt) {
        this.dialog.open(MmlCommandResultComponent, {
            width: "500px",
            height: "290px",
            panelClass: "material-dialog-container",
            data: this.params.data
        });
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

}