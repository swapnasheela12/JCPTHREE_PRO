import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { GridOptions } from '@ag-grid-community/all-modules';
import { Subscription } from 'rxjs';

@Component({
  selector: 'delete-renderer',
  template: `<div class="grid-delete-button">
  <button fxFlex="50" style="color: #737373" class="ic ic-custom-delete hover-show" mat-button 
  (click)="delete(params)"></button>
  </div>
  `,
})

export class DeleteRendererComponent implements ICellRendererAngularComp, OnDestroy {
  params;
  leftGridOptionData: GridOptions;
  rightGridOptionData: GridOptions;
  fifteenMinsKpiGridOptionsData: GridOptions;
  subscriptionMessage: Subscription = new Subscription();

  constructor(
    public datashare: DataSharingService
  ) {}

  agInit(params): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }

  delete(params) {
    if (params.data["15MinValue"] == "No") {
      this.subscriptionMessage.add(this.datashare.leftGridMessage.subscribe((leftGridOptionSample) => {
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
      }));
    }
    if (params.data["15MinValue"] == "Yes") {
      this.subscriptionMessage.add(this.datashare.fifteenMinsKpiGridMessage.subscribe((ifteenMinsKpiGridSample) => {
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
      }));
    }
  }

  ngOnDestroy() {
    if (this.subscriptionMessage) {
      this.subscriptionMessage.unsubscribe();
    }
  }
}