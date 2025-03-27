import { Component, OnInit } from '@angular/core';
import { COLUMN_DEFS } from './ag-column-defs.constant';
import { HttpClient } from "@angular/common/http";
import * as _ from 'lodash';
declare var $: any;

  
interface reportsMeasure {
  value: string;
  viewValue: string;
}

export interface DialogData {
  animal: string;
  name: string;
}
export class GroupLevel {
  level = 0;
  field = '';
}
const COLUMNDEFS = COLUMN_DEFS;


@Component({
  selector: 'app-ag-grid-column-rendering',
  templateUrl: './ag-grid-column-rendering.component.html',
  styleUrls: ['./ag-grid-column-rendering.component.scss']
})

export class AgGridColumnRenderingComponent implements OnInit {

 
columnDef: any;
// @Input('columnDefs') columnDefs: [];
columnDefs = COLUMNDEFS;
dataSource = [];
allData = [];
collapseColumn = true;
displayedColumns: string[] = [];
columnsToDisplay: string[] = [];
columnObject = {};
rowData = [];
firstHeaderGroup = [];
icons: { columnGroupClosed: string; columnGroupOpened: string };
constructor(private httpService: HttpClient) {}

ngOnInit() {
  this.columnsToDisplay = [
    'vendor',
    'backhaultotal',
    'datacentertotal',
    'internettotal',
    'l2total',
    'datacommunicationtotal'
  ];
  this.setFirstHeaders(this.columnDefs);

  this.httpService
    .get('assets/data/modules/sample-poc/ag-column-data.json')
    .subscribe((data: any[]) => {
      this.allData = data;
      this.rowData = data;
    });
  this.displayedColumns = this.getColumnDisplayArray(this.columnDefs);
  this.columnDef = [];
  this.columnDefs.forEach(element => {
    if (element['children']) {
      this.columnDef.push({
        headerName: element['headerName'],
        groupSize: 1,
        columnName: element['children'][0]['field'],
        isOpen: false,
        children: this.getHeaderChildren(element['children'])
      });
    }
  });
  this.icons = {
    columnGroupClosed: '<i class="material-icons">add_circle_outline</i>',
    columnGroupOpened: '<i class="material-icons">remove_circle_outline</i>'
  };
}

/**
 *
 * returns columnArray with new field element.
 *
 * @author Prabhudeen Gautam
 *
 */

getColumnDisplayArray(columnDefs: any) {
  const columnArray = [];
  columnDefs.forEach(
    (element: { [x: string]: string | number; children: any }) => {
      if (element.children) {
        element.children.forEach((data: { [x: string]: any }) => {
          this.columnObject[data.field] = data.headerName;
          columnArray.push(data.field);
        });
      } else {
        this.columnObject[element.field] = '';
      }
    }
  );

  return columnArray;
}

/**
 *
 * assigns headerName to the columnDefs
 *
 * @author Prabhudeen Gautam
 *
 */
setFirstHeaders(columnDefs: any) {
  this.firstHeaderGroup = columnDefs.map((element: { [x: string]: any }) => {
    return element.headerName;
  });
}

/**
 *
 * assigns headerName with the field
 *
 * @author Prabhudeen Gautam
 *
 */

getHeaderChildren(columnArray: any) {
  const array = [];
  columnArray.forEach((element: { [x: string]: any }) => {
    if (element.headerName) {
      array.push(element.field);
    }
  });

  return array;
}

}
