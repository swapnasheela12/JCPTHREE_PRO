import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'status-button-renderer',
  template: `
  <button class="success-button" *ngIf="enabled">{{status}}</button>
  <button class="disabled-button" *ngIf="!enabled">{{status}}</button>
  `,
    styles: [`
      .success-button {
          background-color: #60DD5C;
          width: 72px;
          height: 24px;
          margin-top: 10px;
          border-radius: 4px;
          border: none;
          padding: 0px;
          line-height: 2;
          color: white;
      }
      .disabled-button {
        background-color: #c4c4c4;
        width: 72px;
        height: 24px;
        margin-top: 10px;
        border-radius: 4px;
        border: none;
        padding: 0px;
        line-height: 2;
        color: white;
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
    this.enabled = (this.status.toLowerCase() === 'enabled');
  }

  refresh(params?: any): boolean {
    return true;
  }
}