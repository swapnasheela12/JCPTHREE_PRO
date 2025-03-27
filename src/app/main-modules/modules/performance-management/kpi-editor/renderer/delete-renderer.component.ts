import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { GridOptions } from '@ag-grid-community/all-modules';
import { Subscription } from 'rxjs';

@Component({
  selector: 'delete-renderer',
  template: `
 <button mat-icon-button [matMenuTriggerFor]="kpiEditorMenu" style="float:right;" aria-label="Example icon-button with a menu">
 <mat-icon style="line-height: 0;color:black !important;"><span class="zmdi zmdi-more-vert"></span></mat-icon>
 </button>
 <mat-menu #kpiEditorMenu="matMenu" class="kpi-editor-menu-render" xPosition="before">
 <button mat-menu-item>
 <span>Info</span>
 </button>
 <button (click)="delete(params)" mat-menu-item>
 <span>Delete</span>
 </button>
 </mat-menu>
  `,
})

export class DeleteCreatedKpiRendererComponent implements ICellRendererAngularComp, OnDestroy {

  params;
  leftGridOptionData: GridOptions;
  rightGridOptionData: GridOptions;
  fifteenMinsKpiGridOptionsData: GridOptions;
  subscriptionMessage: Subscription = new Subscription();

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
    if (params.data["KPIValue"] == "No") {
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
      }));
    }
    if (params.data["KPIValue"] == "Yes") {
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
      }));
    }
  }

  ngOnDestroy() {
    if (this.subscriptionMessage) {
      this.subscriptionMessage.unsubscribe();
    }
  }
}