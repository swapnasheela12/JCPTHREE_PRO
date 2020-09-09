import { Component, OnDestroy } from '@angular/core';
 import { IHeaderAngularComp } from 'ag-grid-angular';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { GridOptions } from '@ag-grid-community/all-modules';
import { Subscription } from 'rxjs';

@Component({
  selector: 'custom-header',
  template: `
    <div class="grid-delete-button">
      <button mat-icon-button fxFlex="50" style="color: #737373" class="ic ic-custom-delete hover-icon" 
      [style.display]="showGlobalDeleteKpiOperation==true ? 'block' : 'none'" 
      [disableRipple]="true" mat-icon-button (click)="bulkDeleted(params)"></button>
    </div>
  `
})
export class CustomHeaderComponent implements IHeaderAngularComp, OnDestroy {
  public params: object;
  leftGridKpiOptions: GridOptions;
  rightGridKpiOptions: GridOptions;
  public showGlobalDeleteKpiOperation;
  messageSubscription: Subscription;

  constructor(
    public datashare: DataSharingService
  ) {
    this.showGlobalDeleteKpiOperation = false;
  }

  agInit(params): void {
    this.params = params;
    this.messageSubscription = this.datashare.checkboxMessage.subscribe((data)=>{
      this.showGlobalDeleteKpiOperation = data;
    })
  }

  bulkDeleted(params) {
    let selectedNodes = params.context.rightGridKpiOptions.api.getSelectedNodes();
    selectedNodes.forEach(function (node) {
      params.context.rightGridKpiOptions.api.applyTransaction(
          {
            remove: [node.data]
          }
        );
      params.context.rightGridKpiOptions.api.refreshCells({force: true})
      params.context.leftGridKpiOptions.api.applyTransaction(
        {
          add: [node.data]
        }
      );
    params.context.leftGridKpiOptions.api.refreshCells({force: true})
    });
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}