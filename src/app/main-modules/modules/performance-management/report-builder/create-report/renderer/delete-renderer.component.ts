import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { GridOptions } from '@ag-grid-community/all-modules';

@Component({
  selector: 'delete-renderer',
  template: `
  <button fxFlex="50" style="color: #737373" class="ic ic-bin " mat-button (click)="delete(params)"></button>
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
    console.log(params.api);

    // this.datashare.rightGridMessage.subscribe((leftGridOptionSample) => {
    //     this.rightGridOptionData = leftGridOptionSample;
    //     console.log(this.rightGridOptionData);
    // });
  }

  refresh(params?: any): boolean {
    return true;
  }

  delete(params) {
    console.log(params)
    if (params.data["15MinValue"] == "No") {

      this.datashare.leftGridMessage.subscribe((leftGridOptionSample) => {
        this.leftGridOptionData = leftGridOptionSample;
        console.log(this.leftGridOptionData);
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
        console.log(this.fifteenMinsKpiGridOptionsData);
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