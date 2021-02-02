import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-input-renderer',
  template: `
            <mat-form-field class="form-field-renderer-input" style="width: 90%"  *ngIf="params.value != ''">
              <input matInput #inputRendererAgGrid placeholder="" value="ngModelLable" [(ngModel)]="ngModelLable">
            </mat-form-field>`
})

export class inputRendererComponent implements ICellRendererAngularComp {
  params: any;
  ngModelLable: string;
  selectedColor: string;

  agInit(params): void {
    console.log(params, "params");

    this.selectedColor = params.data.color;
    this.params = params;
    this.ngModelLable = params.value || null;
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

  // colors = ['#ffff00', '#ff3300', '#0000ff'
  // ];

  onChange(value) {
    this.selectedColor = value;
  }
}