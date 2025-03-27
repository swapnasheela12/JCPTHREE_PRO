import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-colorDropdown-renderer',
  template: `
            <mat-form-field class="form-field-selected-color" >
                <mat-select style="width:25px;height:25px" (selectionChange)="onChange(selectedColor)" [(value)]="selectedColor" [ngStyle]="{'background-color':selectedColor}" disableOptionCentering class="mat-select-selected-layers" placeholder="">
                    <mat-option *ngFor="let color of colors; index as i;" [value]="color">
                        <div [ngStyle]="{'background-color':color}" style="width: 25px;height: 25px;"></div>
                    </mat-option>
                </mat-select>
            </mat-form-field>`
})

export class colorDropdownRendererComponent implements ICellRendererAngularComp {
  params: any;
  label: string;
  selectedColor: string;

  agInit(params): void {
    this.selectedColor = params.data.color;
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

  colors = ['#ffff00', '#ff3300', '#0000ff'
  ];

  onChange(value) {
    this.selectedColor = value;
  }
}