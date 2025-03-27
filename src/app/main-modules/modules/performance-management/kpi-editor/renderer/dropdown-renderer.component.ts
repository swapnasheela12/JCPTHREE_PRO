import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
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
  styles: [
    `
        .kpi-editor-menu-render .mat-menu-content .mat-menu-item:hover {
            background-color: #f3f7fc;
        }
    `]
})

export class createKpiDropdownRendererComponent implements ICellRendererAngularComp {
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
    return true;
  }

}