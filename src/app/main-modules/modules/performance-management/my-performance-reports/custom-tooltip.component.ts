import { Component, ViewEncapsulation } from '@angular/core';
import { ITooltipAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'tooltip-component',
  template: `
    <div *ngIf="row == '%Change'" class="custom-tooltip" fxLayout="column" fxLayoutAlign="center center">
        <div class="text" style="margin:5px">Pre : {{ data.pre }}</div>
        <div class="text" style="margin:5px 5px 8px 5px">Post : {{ data.post }}</div>
    </div>
  `,
  styles: [
    `
      :host {
        position: absolute;
        width: 100px;
        right:50px;
        min-height: 90px;
        overflow: hidden;
        pointer-events: none;
        transition: opacity 1s;
      }

      :host.ag-tooltip-hiding {
        opacity: 0;
      }

      .custom-tooltip {
        margin: 5px;
        background-color:#434962;
        white-space: nowrap;
      }
      .text{
        color: #FFFFFF;
        font-size: 14px
      }
    `,
  ],
})
export class CustomTooltip implements ITooltipAngularComp {
  public params: any;
  public data: any;
  public row: any;

  agInit(params): void {
    this.params = params;
    this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
    this.row = this.data.kpiImpact
  }
}
