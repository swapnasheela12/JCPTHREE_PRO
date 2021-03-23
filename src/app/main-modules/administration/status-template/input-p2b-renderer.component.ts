import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DataSharingService } from 'src/app/_services/data-sharing.service';

@Component({
  selector: 'app-input-p2b-renderer',
  template: `
            <mat-form-field class="form-field-renderer-input" style="width: 90%"  *ngIf="params.value != ''">
              <input matInput #inputRendererAgGrid placeholder="" value="ngModelLable" [(ngModel)]="ngModelLable" [disabled]="disable">
            </mat-form-field>`
})

export class inputP2BRendererComponent implements ICellRendererAngularComp {
  params: any;
  ngModelLable: string;
  selectedColor: string;
  disable: boolean = true;

  constructor(private datashare: DataSharingService) {}

  agInit(params): void {
    this.selectedColor = params.data.color;
    this.params = params;
    this.ngModelLable = params.value || null;
  }

  ngOnInit() {
    this.datashare.currentMessage.subscribe((data: any) => {
      if (data.type === "edit") {
        this.disable = false;
      }
    })
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