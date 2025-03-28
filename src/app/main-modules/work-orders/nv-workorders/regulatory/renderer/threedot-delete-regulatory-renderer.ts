import { Component, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { EditCreateWoComponent } from '../regulatory-create-new-workorder/edit-create-wo/edit-create-wo.component';

@Component({
    selector: 'threedot-delete-regulatory-renderer',
    template: `<button *ngIf="showDisabled" mat-icon-button [matMenuTriggerFor]="reportbuilderEditorMenu"
     aria-label="Example icon-button with a menu">
            <mat-icon style="line-height: 0;color:black !important;"><span class="zmdi zmdi-more-vert"></span></mat-icon>
        </button>
        <mat-menu #reportbuilderEditorMenu="matMenu" class="reportbuilder-editor-menu-render" xPosition="before">
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

export class ThreeDotDeleteRegulatoryRenderer implements ICellRendererAngularComp {
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
            this.showDisabled =  true
        }
        this.params = params;
        this.datashare.checkboxMessage.subscribe((checkbox) => {
            this.dataTest = checkbox;
        });
    }

    refresh(): boolean {
        return true;
    }

    deleteRow(evt) {
        let deletedRow = this.params.node.data;
        this.params.api.updateRowData({ remove: [deletedRow] })
      }

}