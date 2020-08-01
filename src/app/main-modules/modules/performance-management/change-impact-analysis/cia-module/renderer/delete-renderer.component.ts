import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { GridOptions } from '@ag-grid-community/all-modules';

@Component({
  selector: 'delete-renderer',
  template: `<div>
  <button mat-icon-button style="color: #737373;text-align: center;margin-left: -9px;"
  [style.display]="showGlobalDeleteKpiOperation == false ? 'block' : 'none'" 
  [disableRipple]="true" mat-icon-button class="ic ic-custom-delete hover-icon" (click)="delete(params)"></button>
  </div>
  `,
})

export class DeleteRendererComponent implements ICellRendererAngularComp {

  params;
  leftGridKpiOptions: GridOptions;
  rightGridKpiOptions: GridOptions;
  public showGlobalDeleteKpiOperation;

  constructor(
    public datashare: DataSharingService
  ) {
    this.showGlobalDeleteKpiOperation = false;
    console.log(this.showGlobalDeleteKpiOperation);
  }

  agInit(params): void {
    this.params = params;
    this.showGlobalDeleteKpiOperation = false;
    this.datashare.checkboxMessage.subscribe((data)=>{
      this.showGlobalDeleteKpiOperation = data;
    })
  }

  refresh(params?: any): boolean {
    return true;
  }

  delete(params) {
    this.datashare.leftGridMessage.subscribe((leftGridOptionSample) => {
      this.leftGridKpiOptions = leftGridOptionSample;
      console.log(this.leftGridKpiOptions);
      this.leftGridKpiOptions.api.applyTransaction(
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