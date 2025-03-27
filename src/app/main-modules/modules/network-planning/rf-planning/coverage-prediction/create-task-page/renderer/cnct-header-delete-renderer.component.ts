import { Component, OnDestroy, ViewChild } from '@angular/core';
import { AgGridAngular, IHeaderAngularComp } from 'ag-grid-angular';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { GridOptions } from '@ag-grid-community/all-modules';
import { Subscription } from 'rxjs';

@Component({
  selector: 'nc-delete-custom-header',
  template: `
    <div fxLayout="row" class="grid-delete-button">
      <button mat-icon-button fxFlex="50" style="color: #737373" class="ic ic-custom-delete hover-icon" 
      [disableRipple]="true" mat-icon-button (click)="bulkDeleted(params)"></button>
    <button (click)="onAddRowsug(params)" class="next-button button" mat-raised-button color="primary">Add</button>
    </div>
  `
})
export class NcDeleteHeaderRendererComponent implements IHeaderAngularComp, OnDestroy {
  public params: object;
  leftGridKpiOptions: GridOptions;
  gridOptions: GridOptions;
  public showGlobalDeleteKpiOperation;
  messageSubscription: Subscription;
  @ViewChild('sugGrid') sugGrid: AgGridAngular;

  constructor(
    public datashare: DataSharingService
  ) {
    this.showGlobalDeleteKpiOperation = false;
  }

  agInit(params): void {
    this.params = params;
    console.log(params.context)
  }
  onAddRowsug(params) {
    // this.sugGrid.api.addItems([{ name: 'Exp1', grid: '', gGnb: '', gOdsc: '' }]);
    // params.context.sugGrid.api.addItems([{ name: 'Exp1', grid: '', gGnb: '', gOdsc: '' }]);
    params.context.gridOptions.api.addItems([{ name: 'Exp1', grid: '', gGnb: '', gOdsc: '' }])

    console.log(params.context)
  }
  bulkDeleted(params) {
    let selectedNodes = params.context.gridOptions.api.getSelectedNodes();
    selectedNodes.forEach(function (node) {
      params.context.gridOptions.api.applyTransaction(
        {
          remove: [node.data]
        }
      );
      params.context.gridOptions.api.refreshCells({ force: true })
    });
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}