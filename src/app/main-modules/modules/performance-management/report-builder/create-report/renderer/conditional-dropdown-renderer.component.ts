import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormArray } from '@angular/forms';

@Component({ 
  selector: 'dropdown-button-renderer',
  template: `
    <div *ngIf="formGroup" [formGroup]="formGroup" fxLayout="row" fxLayouAlign="start center">
    <mat-form-field style="max-width:82px; margin-right: 15px">
      <mat-select [formControlName]="key" [id]="key" placeholder="" (selectionChange)="changeOnCondition($event)" >
        <mat-option *ngFor="let condition of Conditions" [value]="condition">
            {{condition}}
        </mat-option>
      </mat-select>
    </mat-form-field>
    <mat-form-field style="width:auto;max-width:40px;margin-right: 15px">
        <input type="number" matInput placeholder="" id="my-jcp-setting-search-id">
    </mat-form-field>
    <mat-form-field style="width:auto;max-width:40px;" *ngIf="ifBetween">
        <input matInput type="number" name="between-condition">
    </mat-form-field>
    </div>
    `,
    encapsulation: ViewEncapsulation.None
})

export class conditionalDropdownRendererComponent implements ICellRendererAngularComp {
  params;
  Conditions = [
    '<=',
    '==',
    '>=',
    '<',
    '>',
    'Between'
  ];
  ifBetween:Boolean = false;
  ifnotBetween:Boolean = true;

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
      console.log(params)
      this.formGroup = params.context.formGroup;
      // this.formGroup.controls[this.key].patchValue(params.value);
      return true;
  }

  changeOnCondition(condition) {
    if ('Between'== condition.value) {
        this.ifBetween = true;
    } else {
        this.ifBetween = false;
    }
  }
}