import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormArray } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dropdown-button-renderer',
  template: `
  
    <mat-form-field class="form-field-selected-query" style="width: 75%;">
        <mat-select (selectionChange)="onChange(selectedColor)" [(ngModel)]="selectedColor"  disableOptionCentering class="mat-select-selected-layers-query" placeholder="">
            <mat-option *ngFor="let color of colors; index as i;" [value]="selectedColor">{{color}}</mat-option>
        </mat-select>
    </mat-form-field>
    `,
  styles: [
    `

    `
  ],
  encapsulation: ViewEncapsulation.None
})

export class dropdownPriorityRendererComponent implements ICellRendererAngularComp {
  params: any;
  label: string;
  selectedColor: string;

  agInit(params): void {
    this.selectedColor = params.data.ptype;
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);

    }
  }

  colors = ['P1', 'P2', 'P3'];

  onChange(value) {
    this.selectedColor = value;
  }

}