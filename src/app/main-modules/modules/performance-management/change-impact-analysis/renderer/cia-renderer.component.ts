import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'dropdown-button-renderer',
  template: `
    <mat-form-field fxFlex="50" *ngIf="columnName == '%Change Improvement'">
      <mat-select [(ngModel)]="changeImprovement">
        <mat-option *ngFor="let changeImp of changeImpList" [value]="changeImp">
            {{changeImp}}
        </mat-option>
      </mat-select>
    </mat-form-field>
    <mat-form-field fxFlex="70" *ngIf="columnName == 'CIA Module'">
      <mat-select [(ngModel)]="ciaModule">
        <mat-option *ngFor="let ciaModule of ciaAndCustomModuleList" [value]="ciaModule">
            {{ciaModule}}
        </mat-option>
      </mat-select>
    </mat-form-field>
    <mat-form-field fxFlex="70" *ngIf="columnName == 'Custom Module'">
      <mat-select [(ngModel)]="customModule">
        <mat-option *ngFor="let customModule of ciaAndCustomModuleList" [value]="customModule">
            {{customModule}}
        </mat-option>
      </mat-select>
    </mat-form-field>
    <mat-form-field fxFlex="25" *ngIf="columnName == 'Days-Improvement/Degradation'">
      <mat-select [(value)]="daysImprovementVal">
        <mat-option *ngFor="let daysImprovement of daysImprovementList" [value]="daysImprovement">
            {{daysImprovement}}
        </mat-option>
      </mat-select>
    </mat-form-field>
    `,
  encapsulation: ViewEncapsulation.None
})

export class ciaDropdownRenderersComponent implements ICellRendererAngularComp {
  params;
  changeImprovement = "+";
  ciaModule = "Enable";
  customModule = "Disable";
  changeImpList = [
    '+',
    '-',
  ];
  ciaAndCustomModuleList = [
    'Enable',
    'Disable'
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
    this.columnName = params.column.colDef.headerName;
    this.rowIndex = params.rowIndex;
    this.daysImprovementVal = this.daysImprovementList[this.rowIndex];
  }

  refresh(params?: any): boolean {
    return true;
  }

}