// Author: T4professor

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid';

@Component({
    selector: 'app-button-renderer',
    template: `
    <!-- <button mat-raised-button color="primary" [disabled]="deletebutton"
            class="buttonWidth button">
    <mat-icon  style="line-height: 0; font-size: 15px;color: rgba(0,0,0,0.54);" (click)="onClick($event)">
    <span class="delete-trash-icon ic ic-custom-delete"></span></mat-icon>
    </button> -->

    <button mat-button [disabled]="!params.node.data.enableButton" (click)="onClick($event)">
        <!-- <span class="delete-trash-icon ic ic-custom-delete"></span> -->
        <mat-icon  style="line-height: 1; font-size: 15px;">
        <span class="delete-trash-icon ic ic-custom-delete"></span>
        </mat-icon>
    </button>
    <!-- <button mat-icon-button [disabled]="!params.node.data.enableButton"  (click)="onClick($event)" aria-label="Example icon-button with a menu">
        <mat-icon style="line-height: 0; font-size: 15px;color: rgba(0,0,0,0.54);"><span class="delete-trash-icon ic ic-custom-delete"></span></mat-icon>
    </button> -->
    
    <!-- <button type="button" (click)="onClick($event)">{{label}}</button> -->
    `
})

export class DeleteButtonRenderComponent implements ICellRendererAngularComp {

    params;
    label: string;
    public deletebutton: boolean;

    agInit(params): void {
        this.params = params;
        this.label = this.params.label || null;
        // this.deletebutton = this.params.data.deleteflag;
        this.deletebutton = false;
    }

    refresh(params?: any): boolean {
        return true;
    }


    onClick($event) {
        if (this.params.onClick instanceof Function) {

            console.log(this.params.data.deleteflag, "this.params");
            let deletedRow = this.params.node.data;
            this.params.api.updateRowData({ remove: [deletedRow] });
            // put anything into params u want pass into parents component
            const params = {
                event: $event,
                rowData: this.params
                // ...something
            }
            this.params.onClick(params);

        }
    }

    deleteRow(evt) {
        let deletedRow = this.params.node.data;
        this.params.api.updateRowData({ remove: [deletedRow] });
    }
}