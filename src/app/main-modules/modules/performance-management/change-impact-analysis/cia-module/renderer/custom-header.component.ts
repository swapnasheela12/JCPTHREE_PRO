import { Component } from '@angular/core';
 import { IHeaderAngularComp } from 'ag-grid-angular';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { GridOptions } from '@ag-grid-community/all-modules';

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
export class CustomHeaderComponent implements IHeaderAngularComp{
  public params: any;
  leftGridKpiOptions: GridOptions;
  rightGridKpiOptions: GridOptions;
  public showGlobalDeleteKpiOperation;

  constructor(
    public datashare: DataSharingService
  ) {
    this.showGlobalDeleteKpiOperation = false;
  }

  agInit(params): void {
    this.params = params;
    this.datashare.checkboxMessage.subscribe((data)=>{
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
}