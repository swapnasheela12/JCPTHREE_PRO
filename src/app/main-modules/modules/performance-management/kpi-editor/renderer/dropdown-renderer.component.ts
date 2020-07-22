import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid';
import { CommonPopupComponent, CommonDialogModel } from '../../../../../core/components/commanPopup/common-popup/common-popup.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormArray } from '@angular/forms';

@Component({ 
  selector: 'dropdown-button-renderer',
  template: `
    <div *ngIf="formGroup" [formGroup]="formGroup">
    <mat-form-field>
      <mat-select [formControlName]="key" [id]="key" placeholder="{{columnName}}">
        <mat-option *ngFor="let eachAggr of Aggr" [value]="eachAggr">
            {{eachAggr}}
        </mat-option>
      </mat-select>
    </mat-form-field>
    
    </div>
    `,
    encapsulation: ViewEncapsulation.None
})

export class dropdownRendererComponent implements ICellRendererAngularComp {
  params;
  Aggr = [
    'AVG',
    'COUNT',
    'MAX',
    'MIN',
    'SUM'
  ];

  formGroup: FormArray;
    key;
    private value;
    columnName: string;
    private rowId: number;
  constructor(
  ) {
  }

  agInit(params): void {
    this.params = params;
    this.columnName = params.column.colDef.headerName;
    this.key = params.context.createKey(params.columnApi, params.column);
    this.value = params.value;
    this.rowId = params.node.id;

  }

  refresh(params?: any): boolean {
      this.formGroup = params.context.formGroup;
      console.log(params);
      // this.formGroup.controls[this.key].patchValue(params.value);
      return true;
  }

}