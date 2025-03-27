import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'app-dropdown',
  template: `
    <mat-form-field fxFlex="100" style="max-width: 100%">
      <mat-select [(ngModel)]="siteParameter">
        <mat-option *ngFor="let sp of siteParameterList" [value]="sp">
            {{sp}}
        </mat-option>
      </mat-select>
    </mat-form-field>
    `,
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements ICellRendererAngularComp {
  params;
  siteParameter = "E-Tilt(deg)";

  siteParameterList = [
    'E-Tilt',
    'Tx attenuation-Port1 (db)',
    'Tx attenuation-Port2 (db)',
  ];
  columnName: string;
  rowIndex: number;

  agInit(params): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }
}

