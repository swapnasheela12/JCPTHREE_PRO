import { Component } from '@angular/core';
import { ITooltipAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'tooltip-component',
  template: `
    <div class="custom-tooltip" fxLayout="column" fxLayoutAlign="center center">
        <div class="text" style="margin:5px">Pune - Query</div>
    </div>
  `,
  styles: [
    `
      :host {
        position: absolute;
        max-width: 320px;
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
        white-space: break-spaces;
      }
      .text{
        color: #FFFFFF;
        font-size: 14px
      }
    `,
  ],
})
export class ncCtTooltipComponent implements ITooltipAngularComp {
  public params: object;
  public data: any;
  public row: string;

  agInit(params): void {
    this.params = params;
    this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
    this.row = this.data.kpiImpact
  }
}