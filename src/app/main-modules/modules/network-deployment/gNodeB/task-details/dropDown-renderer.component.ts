import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';
import { Component, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { FormArray } from '@angular/forms';


@Component({
  selector: 'dropDown-button-renderer',
  template: `<div>
  <mat-form-field style="width: 100%">
    <mat-select [(ngModel)]="selectedReason">
      <mat-option *ngFor="let eachAggr of Aggr" [value]="eachAggr">
          {{eachAggr}}
      </mat-option>
    </mat-select>
  </mat-form-field>
  
  </div>`,
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

export class DropDownRendererComponent implements ICellRendererAngularComp {
  params;
  Aggr = [
    'Lorem Ipsum is simply',
    'Lorem Ipsum is simply 1',
    'Lorem Ipsum is simply 2'
  ];

  formGroup: FormArray;
  key;
  selectedReason;
  private value;
  columnName: string;
  private rowId: number;
  constructor() { }

  agInit(params): void {
    this.params = params;
    this.selectedReason = this.params.value;
    // this.columnName = params.column.colDef.headerName;
    // this.key = params.context.createKey(params.columnApi, params.column);
    // this.value = params.value;
    // this.rowId = params.node.id;

  }

  refresh(params?: any): boolean {
    this.formGroup = params.context.formGroup;
    // this.formGroup.controls[this.key].patchValue(params.value);
    return true;
  }

}