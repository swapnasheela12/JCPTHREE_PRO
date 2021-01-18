import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'dropdown-button-renderer',
  template: `
    <mat-form-field fxFlex="66" *ngIf="columnName == 'Grid Selection'">
      <mat-select [(ngModel)]="changeImprovement">
        <mat-option fxLayout="column wrap" fxLayoutAlign="start start" style="height: 110px;" *ngFor="let changeImp of changeImpList" [value]="changeImp">
           <div style="height:30px"> {{changeImp}}</div>
          <div fxLayout="row wrap"> 
           <span style="line-height: 11px;  white-space: pre-wrap; font-size: 9px;
           text-indent: -5px;">&nbsp; Total_Traffic_in_GB > 400 OR N_AND_L_POI_COUNT > 0 OR SMB_POI_ COUNT > 0 OR GOVERNMENT_POI_COUNT >0 OR (Total_Traffic_in_GB> 200 AND ((DeadDominantCell Count+ ICUDominantCellCount+ HospitalizedDominant CellCount) TotalDominantCellCount)>0.5)</span>
           </div>
        </mat-option>
      </mat-select>
    </mat-form-field>
    <mat-form-field fxFlex="70" *ngIf="columnName == '5G gNB Selection'">
      <mat-select [(ngModel)]="ciaModule">
        <mat-option *ngFor="let ciaModule of ciaAndCustomModuleList" [value]="ciaModule">
            {{ciaModule}}
        </mat-option>
      </mat-select>
    </mat-form-field>
    <mat-form-field fxFlex="70" *ngIf="columnName == '5G ODSC Selection'">
      <mat-select [(ngModel)]="customModule">
        <mat-option *ngFor="let customModule of ciaAndCustomModuleList" [value]="customModule">
            {{customModule}}
        </mat-option>
      </mat-select>
    </mat-form-field>
    `,
  encapsulation: ViewEncapsulation.None
})

export class cnctDropdownRendererComponent implements ICellRendererAngularComp {
  params;
  changeImprovement = "+";
  ciaModule = "Enable";
  customModule = "Disable";
  changeImpList = [
    'Pune-Query 1',
    'Pune-Query 2',
    'Pune-Query 3',
    'Pune-Query 4',
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
    this.columnName = params.column.colDef.headerName;
    this.rowIndex = params.rowIndex;
    this.daysImprovementVal = this.daysImprovementList[this.rowIndex];
  }

  refresh(params?: any): boolean {
    return true;
  }

}