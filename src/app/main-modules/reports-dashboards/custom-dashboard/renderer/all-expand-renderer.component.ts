import { Component, ViewChild, ElementRef } from '@angular/core';
 import { IHeaderAngularComp } from 'ag-grid-angular';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { GridOptions } from '@ag-grid-community/all-modules';

export class GroupLevel {
  level = 0;
  field = '';
}

@Component({
  selector: 'custom-header',
  template: `
    <div class="grid-expand-button" (click)="allExpand(params)">
        <span class="{{className}}"></span>
        Direction
    </div>
  `
})
export class AllExpandRendererComponent implements IHeaderAngularComp{
  public params: any;
  twampGridOptions: GridOptions;
  expandFlag = false;
  groupList: any;
  rowData: any;
  className: String = 'ic ic-circle-down grid-icon';
  rowData1: any;

  constructor() {
  }

  agInit(params): void {
    this.params = params;
    
  }

  allExpand(params) {
      this.expandFlag =  !this.expandFlag;
      const parentArray= JSON.parse(JSON.stringify(this.params.context.componentParent.rowData1));

      for (let j = 1; j <= this.params.context.componentParent.rowData1.length; j++) {
        const rowDetails = this.params.context.componentParent.rowData1[j-1];
        parentArray[j-1].expand = true;
        if (rowDetails.children == undefined) {
            parentArray.splice(j, 1);
        }
        
      }

      this.rowData = JSON.parse(JSON.stringify(parentArray));
      this.params.context.componentParent.twampGridOptions.api.setRowData(this.rowData);
      let index = 1;
      if (this.expandFlag == true) {
        this.className = 'ic ic-circle-up grid-icon';
        for (let j = 1; j <= this.params.context.componentParent.rowData1.length; j++) {
          const rowDetails = this.params.context.componentParent.rowData1[j-1];
          const array = rowDetails.children;
          this.groupList = this.params.context.componentParent.groupList;
          for (let i = 1; i <= array.length; i++) {
            array[i - 1].level = this.groupList.length + 1;
            array[i - 1].parent =
              array[i - 1][this.groupList[this.groupList.length - 1].field];
            parentArray.splice(index+j-1, 0, array[i - 1]);
            index++;
          }
        }
      } else {
        this.className = 'ic ic-circle-down grid-icon';
        for (let j = 1; j <= this.params.context.componentParent.rowData1.length; j++) {
          parentArray[j-1].expand = false;
        }
      }

      this.rowData = JSON.parse(JSON.stringify(parentArray));
      this.params.context.componentParent.twampGridOptions.api.setRowData(this.rowData);
  }
}