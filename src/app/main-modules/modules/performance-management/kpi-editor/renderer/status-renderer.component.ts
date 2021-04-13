import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'status-button-renderer',
  template: `
  <div class="success-button" *ngIf="enabled == true">{{status}}</div>
  <div class="disabled-button" *ngIf="enabled == false">{{status}}</div>
  <div style="padding-left:30px" *ngIf="enabled == null">-</div>
  `,
  styles: [`
      .success-button {
        border-left: 4px solid #60DD5C;
        line-height: 2;
        padding-left: 10px;
      }
      .disabled-button {
        border-left: 4px solid #c4c4c4;
        line-height: 2;
        padding-left: 10px;
      }`
  ]
})

export class StatusRendererComponent implements ICellRendererAngularComp {

  params;
  status: string;
  enabled: Boolean;
  generation: any;

  agInit(params): void {
    this.params = params;
    this.status = this.params.data.status || null;
    this.generation = this.params.data.generation || null;
    if(this.status != null && this.generation == 'System Driven'){
      if (this.status.toLowerCase() === 'enabled') {
        this.enabled = true;
      } else if (this.status.toLowerCase() === 'disabled') {
        this.enabled = false;
      }
    }
  }

  refresh(params?: any): boolean {
    return true;
  }
}