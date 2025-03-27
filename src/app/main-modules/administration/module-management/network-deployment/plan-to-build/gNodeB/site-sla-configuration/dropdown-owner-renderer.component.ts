import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-drp-owner-renderer',
    template: `
  <mat-form-field class="twamp-field-container" *ngIf="params.value != ''" fxFlex="auto">
  <mat-select [(value)]="drpValue[0].value" disableOptionCentering (openedChange)="openedChange($event)">
      <input matInput [(ngModel)]="searchDropdownValue" autocomplete="off"
          [ngModelOptions]="{standalone: true}" placeholder="Search..."
          style="height: 48px !important;padding-left:15px">
      <mat-option *ngFor="let item of drpValue | filter:searchDropdownValue"
          [value]="item.value">
          {{item.value}}
      </mat-option>
  </mat-select>
</mat-form-field>
`
})

export class DropdownOwnerRendererComponent implements ICellRendererAngularComp {
    params: any;
    ngModelLable: string;
    selectedColor: string;
    searchDropdownValue;
    drpValue: any[] = [];

    openedChange(evt) {
        this.searchDropdownValue = '';
    }

    agInit(params): void {
        this.drpValue = [
            { value: 'Rita Bobde' },
            { value: 'Mandar Patil' },
            { value: 'Lorem' }
        ];
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