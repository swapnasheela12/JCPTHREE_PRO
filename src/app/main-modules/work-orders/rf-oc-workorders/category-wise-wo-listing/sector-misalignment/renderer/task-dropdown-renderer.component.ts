import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'dropdown-tbl-renderer',
  template: `
    <mat-form-field fxFlex="100" style="max-width: 100%">
      <mat-select [(ngModel)]="sectorModule">
        <mat-option *ngFor="let sector of sectorModuleList" [value]="sector">
            {{sector}}
        </mat-option>
      </mat-select>
    </mat-form-field>
    `,
  encapsulation: ViewEncapsulation.None
})

export class TaskDropdownRendererComponent implements ICellRendererAngularComp {
  params;
  sectorModule = "Alpha";
  customModule = "Disable";

  sectorModuleList = [
    'Alpha',
    'Beta',
    'Gamma',
    'Alpha Addition',
    'Beta Addition',
    'Gamma Addition'
  ];
  daysImprovementList = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8'
  ];
  public daysImprovementVal;
  columnName: string;
  rowIndex: number;
  constructor(
  ) {
  }

  agInit(params): void {
    this.params = params;
    console.log(params)
    // this.columnName = params.column.colDef.headerName;
    // this.rowIndex = params.rowIndex;
    // this.daysImprovementVal = this.daysImprovementList[this.rowIndex];
  }

  refresh(params?: any): boolean {
    return true;
  }

}