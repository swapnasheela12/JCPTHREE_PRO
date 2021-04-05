import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'status-button-renderer',
  template: `
  <div class="success-button" *ngIf="enabled">{{status}}</div>
  <div class="disabled-button" *ngIf="!enabled">{{status}}</div>
  <div style="padding-left:30px" *ngIf="status == null">-</div>
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

  agInit(params): void {
    this.params = params;
    this.status = this.params.data.status || null;
    if(this.status != null){
      this.enabled = (this.status.toLowerCase() === 'enabled');
    }
  }

  refresh(params?: any): boolean {
    return true;
  }
}