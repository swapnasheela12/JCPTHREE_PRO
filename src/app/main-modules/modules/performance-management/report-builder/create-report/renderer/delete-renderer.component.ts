import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { GridOptions } from '@ag-grid-community/all-modules';

@Component({
  selector: 'delete-renderer',
  template: `<div class="grid-delete-button">
  <button fxFlex="50" style="color: #737373" class="ic ic-custom-delete hover-show" mat-button (click)="delete(params)"></button>
  </div>
  `,
})

export class DeleteRendererComponent implements ICellRendererAngularComp {

  params;
  leftGridOptionData: GridOptions;
  rightGridOptionData: GridOptions;
  fifteenMinsKpiGridOptionsData: GridOptions;

  constructor(
    public datashare: DataSharingService
  ) {
  }

  agInit(params): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }

  delete(params) {
    if (params.data["15MinValue"] == "No") {

      this.datashare.leftGridMessage.subscribe((leftGridOptionSample) => {
        this.leftGridOptionData = leftGridOptionSample;
        this.leftGridOptionData.api.applyTransaction(
          {
            add: [params.node.data]
          }
        );
        params.api.applyTransaction(
          {
            remove: [params.node.data]
          }
        );
        params.api.refreshCells({force: true})
      });
    }
    if (params.data["15MinValue"] == "Yes") {
      this.datashare.fifteenMinsKpiGridMessage.subscribe((ifteenMinsKpiGridSample) => {
        this.fifteenMinsKpiGridOptionsData = ifteenMinsKpiGridSample;
        this.fifteenMinsKpiGridOptionsData.api.applyTransaction(
          {
            add: [params.node.data]
          }
        );
        params.api.applyTransaction(
          {
            remove: [params.node.data]
          }
        );
        
        params.api.refreshCells({force: true})
      });
    }
  }
}